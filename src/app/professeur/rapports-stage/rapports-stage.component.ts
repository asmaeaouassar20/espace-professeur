import { DatePipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { Component ,ElementRef,inject,OnInit,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepotRapportStage, Evaluation } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { StatutRapport } from '../../model/enums';
import { FormGroup,FormControl,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';

import {TypeStage} from '../../model/enums';

@Component({
  selector: 'app-rapports-stage',
  imports: [RouterLink,
    DatePipe,
    NgStyle,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    NgFor],
  templateUrl: './rapports-stage.component.html',
  styleUrl: './rapports-stage.component.css'
})
export class RapportsStageComponent implements OnInit{

  // **** Types de stage *****
  // Convertir l'énumération en tableau
  typesStage=Object.values(TypeStage); 

 

  listDepotsRapport:DepotRapportStage[]=[];

  // Modal pour l'évaluation d'un rapport
  @ViewChild('voirevaluationmodal') voirEvaluationModal: ElementRef | undefined;
  @ViewChild('addevaluationmodal') addEvaluationModal:ElementRef | undefined;


  // Dépot de stage to evaluate
  formAddEvaluation=new FormGroup({
    note:new FormControl(''),
    comment:new FormControl('')
  })

  // Pour éditer le statut d'un rapport
  idDepotToEditStatut:number=-1;   

  evaluationDepotSelectionne!:Evaluation | null | undefined;
  idDepotRapStageToEvaluate:number=-1;

  service=inject(ServiceService);
  snackbar=inject(MatSnackBar);


  // Pour le filtre selon la recherche et le type de stage sélectionné
  searchText:string='';
  selectedTypeStage:TypeStage | undefined;
  filteredDepotsRapport:any[]=[];


  ngOnInit(){
    this.listDepotsRapport=this.service.getRapports();
    this.fetchRappStageAddSelectedProp();

    this.filteredDepotsRapport=[...this.listDepotsRapport];
  }



  fetchRappStageAddSelectedProp(){
    this.listDepotsRapport=this.listDepotsRapport.map(depot=>({
      ...depot,
      selectedRadio:depot.selectedRadio || null // ajouter une propriété 'selectdRadio' si elle n'existe pas
    }))

    this.listDepotsRapport.forEach(depot=>{

      if(depot.statut==StatutRapport.V){
        depot.selectedRadio='V';
      }else if(depot.statut==StatutRapport.NV){
        depot.selectedRadio='NV';
      }else{
        depot.selectedRadio=null;
      }
    })
  }


  getColorSelonStatut(statut:StatutRapport | null){
    switch(statut){
      case StatutRapport.V:
        return 'rgb(68, 193, 68)';
      case StatutRapport.NV:
        return 'rgb(255, 70, 70)';
      default:
        return 'grey';
    }
  }

  voirEvaluationOpenModal(idDepotRapport:number){
    if(this.voirEvaluationModal){
      this.voirEvaluationModal.nativeElement.style.display='block';
      const depotStageCourant=this.service.getDepotById(idDepotRapport);
      this.evaluationDepotSelectionne=depotStageCourant?.evaluation;
    }
  }

  closeModal(){
    if(this.voirEvaluationModal){
      this.voirEvaluationModal.nativeElement.style.display='none';
    }
  }


  openModalAddEval(idDepotRapport:number){
    if(this.addEvaluationModal){
      this.addEvaluationModal.nativeElement.style.display='block';
      this.idDepotRapStageToEvaluate=idDepotRapport;
    }
  }

  closeModalAddEval(){
    if(this.addEvaluationModal){
      this.addEvaluationModal.nativeElement.style.display='none';
    }
  }

  saveEvaluation(){
    const newEvaluation:Evaluation={
      id:Math.floor(Math.random()*52),
      note: Number(this.formAddEvaluation.value.note) ?? 0 ,
      comment:this.formAddEvaluation.value.comment ?? ''
    }
    const isEvalAdded=this.service.setEvaluation(this.idDepotRapStageToEvaluate,newEvaluation);
    if(!isEvalAdded){
      this.snackbar.open("la note de validation est 12",'erreur',{duration:5000});
      return;
    }
    this.closeModalAddEval();
    this.snackbar.open("L'évaluation du rapport est ajouté avec succès","Close",{duration:5000});
    this.listDepotsRapport=this.service.getRapports();
    this.filterDepots();
  }

  resetRadioCheck(depotRapport:DepotRapportStage){
    depotRapport.selectedRadio=null;
  }


  editStatut(id:number,statut:StatutRapport){
    this.idDepotToEditStatut=id;
    this.fetchRappStageAddSelectedProp();
  }

  saveNewStatus(depot:DepotRapportStage){
    if(depot.selectedRadio!=null && depot.selectedRadio!=undefined){
      const depotFromService=this.service.getDepotById(depot.id);
      if(depotFromService?.evaluation==null){
        this.openModalAddEval(depot.id);
      }else{
        const note=depotFromService.evaluation.note;
        if(note>=12){
          if(depot.selectedRadio=='NV'){
            this.snackbar.open("vous avez déjà donné une note supérieure à 12",'erreur',{duration:5000});
            return ;
          }
        }else{
          if(depot.selectedRadio=='V'){
            this.snackbar.open("vous avez déjà donné une note inférieure à 12",'erreur',{duration:5000});
            return ;
          }
        }
      }
      this.listDepotsRapport=this.service.setStatutRapportById(depot.id,depot.selectedRadio); 
      this.idDepotToEditStatut=-1;
      this.fetchRappStageAddSelectedProp();
      this.filterDepots();
    }
  }

 

  selectTypeStage(typeStage:TypeStage){
      this.selectedTypeStage=typeStage;
      this.filterDepots();  
  }
  onSearcheChange(event:any){
    this.searchText=event.target.value.trim();  // pour enlever les espace inutiles
    this.filterDepots();
  }
  filterDepots(){
    // Sélectionner tous les stages
    if(this.selectedTypeStage===TypeStage.ALL){
      this.filteredDepotsRapport=[...this.listDepotsRapport];
      return;
    }

    // Si le input de recherche est vide, on réaffiche tous les étudiants
    if(!this.searchText && this.selectedTypeStage==undefined){
      this.filteredDepotsRapport=[...this.listDepotsRapport];
      return
    }

    this.filteredDepotsRapport=this.listDepotsRapport.filter(
      depot=>{
        const isMatchTypeStage=this.selectedTypeStage===undefined? true: this.selectedTypeStage==depot.typeStage;
        const isMatchTitre=depot.titre.toLowerCase().includes(this.searchText.toLowerCase());
        return (isMatchTitre && isMatchTypeStage);
      }
    )
  }
  

}
