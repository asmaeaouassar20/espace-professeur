import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { DepotRapportStage } from '../../model/model';

@Component({
  selector: 'app-details-etudiant',
  imports: [],
  templateUrl: './details-etudiant.component.html',
  styleUrl: './details-etudiant.component.css'
})
export class DetailsEtudiantComponent implements OnInit{

  idDepotRapoortStageSelectionne!:string;

  route=inject(ActivatedRoute);
  service=inject(ServiceService);

  depotsRapportStageSelectionne!:DepotRapportStage | null;
  constructor(){
    
  }

  ngOnInit(): void {
      this.idDepotRapoortStageSelectionne=this.route.snapshot.paramMap.get('id')!;
      console.log('id de dépot de rapport de stage selectionné est : '+this.idDepotRapoortStageSelectionne);

      // Récupérer de dépot du rapport de stage par son id
     this.depotsRapportStageSelectionne=this.service.getDepotById(Number(this.idDepotRapoortStageSelectionne)) ;
      console.log(this.depotsRapportStageSelectionne)
  }

}






