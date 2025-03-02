import { DatePipe, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepotRapportStage } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { StatutRapport } from '../../model/enums';
import { stat } from 'fs';

@Component({
  selector: 'app-rapports-stage',
  imports: [RouterLink,DatePipe,NgStyle],
  templateUrl: './rapports-stage.component.html',
  styleUrl: './rapports-stage.component.css'
})
export class RapportsStageComponent {
  listDepotsRapport:DepotRapportStage[]=[];

  constructor(private service:ServiceService){
    this.listDepotsRapport=this.service.getRapports();
  }


  getColorSelonStatut(statut:StatutRapport){
    switch(statut){
      case StatutRapport.V:
        return 'rgb(68, 193, 68)';
      case StatutRapport.NV:
        return 'rgb(255, 70, 70)';
    }
  }
}
