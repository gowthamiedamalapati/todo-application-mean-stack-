import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lists:any[];
  listId:string;
  listName:string;
  tasks=[];
  taskId:string
  taskList:[]
  updateListId:string;
  updateTaskId:string;


  constructor(private todoService:TodoService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
     this.route.params.subscribe((params:Params)=>{
      this.listId=params['listId']
      this.taskId= params['taskId'];
      this.getLists();
     });
  }

  createNewList(title:string){
  this.todoService.createList(title).subscribe((response:any)=>{
   this.getLists();
  });
  }
  
  getLists(){
    this.todoService.getLists().subscribe((lists:any[])=>{
      this.lists = lists;
      this.lists.forEach((elements)=>{       
       this.todoService.getTask(elements._id).subscribe((tasks:any[])=>{
      elements.taskList=tasks; 
       }) 
      })
    })
  }
 

    updateList(title:string,listId){
    this.todoService.updateList(title,listId).subscribe(()=>{
     this.getLists();
     this.listName=" ";
    })
  }

  deleteList(listId){
    this.todoService.deleteList(listId).subscribe((response)=>{
        this.getLists();
    });
  }
 
  addTask(title:string,listId:string){
    this.todoService.createTask(title,listId).subscribe((response)=>{
        console.log(response);
        this.getLists();
    })
  }
  sendId(listId,taskId){
    console.log(listId);
   console.log(taskId);
   this.updateListId=listId;
   this.updateTaskId=taskId;
   
  }

  updateTask(title:string){
    this.todoService.updateTask(title,this.updateListId,this.updateTaskId).subscribe((response)=>{
     this.getLists();
    })
  }

  deleteTask(listId,taskId){
 
      if(listId && taskId){
      this.todoService.deleteTask(listId,taskId).subscribe(()=>{
        this.getLists();
      })
    }
    
  }
  
  open(listId){
    document.getElementById('hide'+listId).style.display='block';
  }
  close(listId){
    document.getElementById('hide'+listId).style.display='none';
  }
  openDelete(listId){
    document.getElementById('delete'+listId).style.display='block'
  }
  closeDelete(listId){
    document.getElementById('delete'+listId).style.display='none';
  }
  openEdit(listId){
    document.getElementById('edit'+listId).style.display='block'
  }
  closeEdit(listId){
    document.getElementById('edit'+listId).style.display='none';
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
  
}
