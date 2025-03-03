import { DatePipe, NgStyle } from '@angular/common';
import { Component ,ElementRef,inject,OnInit,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepotRapportStage, Evaluation } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { StatutRapport } from '../../model/enums';
import { stat } from 'fs';

@Component({
  selector: 'app-rapports-stage',
  imports: [RouterLink,DatePipe,NgStyle],
  templateUrl: './rapports-stage.component.html',
  styleUrl: './rapports-stage.component.css'
})
export class RapportsStageComponent implements OnInit{

  listDepotsRapport:DepotRapportStage[]=[];

  // Modal pour l'évaluation d'un rapport
  @ViewChild('evaluationmodal') evaluationmodal: ElementRef | undefined;

  evaluationDepotSelectionne!:Evaluation | null | undefined;

  service=inject(ServiceService);
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
    if(this.evaluationmodal){
      this.evaluationmodal.nativeElement.style.display='block';
      const depotStageCourant=this.service.getDepotById(idDepotRapport);
      this.evaluationDepotSelectionne=depotStageCourant?.evaluation;
    }
  }

  closeModal(){
    if(this.evaluationmodal){
      this.evaluationmodal.nativeElement.style.display='none';
    }
  }
}
