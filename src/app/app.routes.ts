import { Routes } from '@angular/router';
import { DetailsEtudiantComponent } from './professeur/details-etudiant/details-etudiant.component';
import { RapportsStageComponent } from './professeur/rapports-stage/rapports-stage.component';
import { EspaceProfesseurComponent } from './professeur/espace-professeur/espace-professeur.component';
import { MesEtudiantsComponent } from './professeur/mes-etudiants/mes-etudiants.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:EspaceProfesseurComponent},
    {path:'details-etudiant/:id',component:DetailsEtudiantComponent},
    {path:'rapports-stage',component:RapportsStageComponent},
    {path:'mes-etudiants',component:MesEtudiantsComponent}

];
