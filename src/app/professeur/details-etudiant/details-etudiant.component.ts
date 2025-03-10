import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { DepotRapportStage, Evaluation, Student } from '../../model/model';
import { DatePipe, NgStyle } from '@angular/common';
import { StatutRapport } from '../../model/enums';

@Component({
  selector: 'app-details-etudiant',
  imports: [NgStyle,DatePipe],
  templateUrl: './details-etudiant.component.html',
  styleUrl: './details-etudiant.component.css'
})
export class DetailsEtudiantComponent implements OnInit{

  idDepotRapoortStageSelectionne!:string;
  evaluationOfDepotSelectionne:Evaluation|null=null;

  @ViewChild('voirevaluation') voirevaluationmodal:ElementRef | undefined;

  route=inject(ActivatedRoute);
  service=inject(ServiceService);

  depotRapportStageSelectionne!:DepotRapportStage | null;
  etudiants:Student[] | undefined=[];


  ngOnInit(): void {
      this.idDepotRapoortStageSelectionne=this.route.snapshot.paramMap.get('id')!;

      // Récupérer de dépot du rapport de stage par son id
     this.depotRapportStageSelectionne=this.service.getDepotById(Number(this.idDepotRapoortStageSelectionne)) ;

      // Récupérer les étuidants qui ont fait ce stage
      this.etudiants=this.depotRapportStageSelectionne?.etudiants;
      const idDepot=Number(this.idDepotRapoortStageSelectionne);
      this.evaluationOfDepotSelectionne=this.service.getEvaluationByIdRapportStage(idDepot);
  }


  getColorSelonStatut(statut:StatutRapport | undefined){
    switch(statut){
      case StatutRapport.V:
        return 'rgb(68, 193, 68)';
      case StatutRapport.NV:
        return 'rgb(255, 70, 70)';
      default:
        return 'grey';
    }
  }


  voirEvaluation(){
    if(this.voirevaluationmodal){
      this.voirevaluationmodal.nativeElement.style.display='block';
    }
  }
  closeModalShowEval(){
    if(this.voirevaluationmodal){
      this.voirevaluationmodal.nativeElement.style.display='none';
    }
  }

}






