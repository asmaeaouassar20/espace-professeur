import { DatePipe, NgStyle } from '@angular/common';
import { Component ,ElementRef,inject,OnInit,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepotRapportStage, Evaluation } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { StatutRapport } from '../../model/enums';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rapports-stage',
  imports: [RouterLink,DatePipe,NgStyle,ReactiveFormsModule],
  templateUrl: './rapports-stage.component.html',
  styleUrl: './rapports-stage.component.css'
})
export class RapportsStageComponent implements OnInit{

  listDepotsRapport:DepotRapportStage[]=[];

  // Modal pour l'évaluation d'un rapport
  @ViewChild('voirevaluationmodal') voirEvaluationModal: ElementRef | undefined;
  @ViewChild('addevaluationmodal') addEvaluationModal:ElementRef | undefined;


  // Dépot de stage to evaluate
  formAddEvaluation=new FormGroup({
    note:new FormControl(''),
    comment:new FormControl('')
  })

  evaluationDepotSelectionne!:Evaluation | null | undefined;
  idDepotRapStageToEvaluate:number=-1;

  service=inject(ServiceService);
  snackbar=inject(MatSnackBar);

  ngOnInit(){
    this.listDepotsRapport=this.service.getRapports();
  }


  getColorSelonStatut(statut:StatutRapport){
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

    this.service.setEvaluation(this.idDepotRapStageToEvaluate,newEvaluation);
    this.closeModalAddEval();
    this.snackbar.open("L'évaluation du rapport est ajouté avec succès","Close",{duration:5000});
  }
  

}
