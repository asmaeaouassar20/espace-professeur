import { Injectable } from '@angular/core';
import { DepotRapportStage, Evaluation, Student } from '../model/model';
import { AnneeEtude, FiliereEtude, StatutRapport, TypeStage } from '../model/enums';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // *****  Etudiants ******
  etudiants:Student[]=[];

  etudiant1:Student={
    id:1,
    nom:'Aouassar1',
    prenom:'Asmae1',
    email:'Asmae1@gmail.com',
    filiere:FiliereEtude.INFO,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/asmae1.png"
  }
  etudiant2:Student={
    id:2,
    nom:'Aouassar2',
    prenom:'Asmae2',
    email:'Asmae2@gmail.com',
    filiere:FiliereEtude.INFO,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/asmae2.png"
  }
  etudiant3:Student={
    id:3,
    nom:'Aouassar3',
    prenom:'Asmae3',
    email:'Asmae3@gmail.com',
    filiere:FiliereEtude.SE,
    anneeEtude:AnneeEtude.C,
    imageUrl:"/img/asmae3.png"
  }
  etudiant4:Student={
    id:4,
    nom:'Aouassar4',
    prenom:'Asmae4',
    email:'Asmae4@gmail.com',
    filiere:FiliereEtude.INDUS,
    anneeEtude:AnneeEtude.A,
    imageUrl:"/img/asmae4.png"
  }
  etudiant5:Student={
    id:5,
    nom:'Aoussar5',
    prenom:'Asmae5',
    email:'Asmae5@gmail.com',
    filiere:FiliereEtude.SE,
    anneeEtude:AnneeEtude.B,
    imageUrl:"/img/asmae5.png"
  }
  etudiant6:Student={
    id:6,
    nom:'Aoussar6',
    prenom:'Asmae6',
    email:'Asmae6@gmail.com',
    filiere:FiliereEtude.INDUS,
    anneeEtude:AnneeEtude.A,
    imageUrl:"/img/asmae6.png"
  }
  etudiant7:Student={
    id:7,
    nom:'Aoussar7',
    prenom:'Asmae7',
    email:'Asmae7@gmail.com',
    filiere:FiliereEtude.INDUS,
    anneeEtude:AnneeEtude.C,
    imageUrl:"/img/asmae7.png"
  }


  // Evaluations
  evaluation1:Evaluation={
    id:1,
    note:18,
    comment:'très bon travail'
  }
  evaluation2:Evaluation={
    id:2,
    note:18,
    comment:'travail terminé avec succès'
  }
  evaluation3:Evaluation={
    id:3,
    note:13.5,
    comment:'Bon travail mais il faut plus d\'efforts au niveau de la rédaction du rapport'
  }

  evaluation4:Evaluation={
    id:4,
    note:10,
    comment:'travail non satisfaisant, il faut avoir une analyse complète et une étude détaillée avec plus d\'interprétaions avant de passer au tableau de bord'
  }

  // *****  Rapports ******
  depotsRapports:DepotRapportStage[]=[];
  depotRapport1:DepotRapportStage={
    id:1,
    titre:"Développement d'une application pour la gestion des rendez-vous",
    description:"Dans ce stage j'ai développé une application pour un service hospitalier  ....",
    etudiants:[this.etudiant1,this.etudiant2],
    evaluation:this.evaluation1,
    statut:StatutRapport.V,
    submissionDate:new Date(2024,5,3,14,30),
    typeStage:TypeStage.PFA
  }
  depotRapport2:DepotRapportStage={
    id:2,
    titre:"Etude de satifaction au SIH chez les employées",
    description:"Dans ce stage on a fait une étude de satisfaction au système d'information ...",
    etudiants:[this.etudiant3],
    evaluation:this.evaluation2,
    statut:StatutRapport.V,
    submissionDate:new Date(2025,0,2,10,5),
    typeStage:TypeStage.PFE
  }
  depotRapport3:DepotRapportStage={
    id:3,
    titre:"Conception et développement d'un système de gestion des employées",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aperiam nam corrupti, voluptatem quos tempore a iusto reprehenderit veniam voluptate!.",
    etudiants:[this.etudiant4],
    evaluation:null,
    statut:StatutRapport.N,
    submissionDate:new Date(2024,8,25,12,45),
    typeStage:TypeStage.INITIATION
  }
  depotRapport4:DepotRapportStage={
    id:4,
    titre:"Réalisation d'un site e-comm pour une coopérative Tanger",
    description:"Lorem ipsum dolor  amet consectetur adipisicing elit.   nam corrupti, voluptatem quos tempore a iusto reprehenderit veniam voluptate!.",
    etudiants:[this.etudiant6],
    evaluation:this.evaluation3,
    statut:StatutRapport.V,
    submissionDate:new Date(2025,1,5,15,40),
    typeStage:TypeStage.PFE
  }

  depotRapport5:DepotRapportStage={
    id:5,
    titre:"Réalisation du tableau de bord",
    description:" nam corrupti, volu reprehenderit veniam voluptate. consectetur adipis",
    etudiants:[this.etudiant7],
    evaluation:this.evaluation4,
    statut:StatutRapport.NV,
    submissionDate:new Date(2025,3,14,21,5),
    typeStage:TypeStage.PFA
  }


  constructor() { 
    this.etudiants.push(this.etudiant1);
    this.etudiants.push(this.etudiant2);
    this.etudiants.push(this.etudiant3);
    this.etudiants.push(this.etudiant4);
    this.etudiants.push(this.etudiant5);
    this.etudiants.push(this.etudiant6);
    this.etudiants.push(this.etudiant7);

    this.depotsRapports.push(this.depotRapport1);
    this.depotsRapports.push(this.depotRapport2);
    this.depotsRapports.push(this.depotRapport3);
    this.depotsRapports.push(this.depotRapport4);
    this.depotsRapports.push(this.depotRapport5);
  }


  getStudents():Student[]{
    return this.etudiants;
  }

  getRapports():DepotRapportStage[]{
    return this.depotsRapports;
  }


  getDepotById(id:number):DepotRapportStage | null{
    for(let depot of this.depotsRapports){
      if(depot.id==id) return depot;
    }
    return null;
  }



  setEvaluation(idDepotStage:number,evaluation:Evaluation):boolean{
    for(let depot of this.depotsRapports){
      if(depot.id===idDepotStage){
          if((depot.statut==StatutRapport.V && evaluation.note<12) || (depot.statut==StatutRapport.NV && evaluation.note>=12)){
            return false;
          }
          depot.evaluation=evaluation;
          return true;
        }
      }
      return false;
    }



 setStatutRapportById(id:number,statut:string):DepotRapportStage[]{
  for(let depot of this.depotsRapports){
    if(depot.id===id){
      if(statut==='V'){
        depot.statut=StatutRapport.V;
      }else{
        depot.statut=StatutRapport.NV;
      }
    }
  }
  return this.depotsRapports;
 }

 getEvaluationByIdRapportStage(idDepot:number):Evaluation | null{
  for(let depot of this.depotsRapports){
    if(depot.id===idDepot){
      return depot.evaluation;
    }
  }
  return null;
 }

deleteStudentById(id:number):boolean{
  for(let i=0;i<this.etudiants.length;i++){
    if(this.etudiants[i].id==id){
      this.etudiants.splice(i,1);
      return true;
    }
  }
  return false;
}

addStudent(Student:Student){
  this.etudiants.push(Student);
}
  
}
