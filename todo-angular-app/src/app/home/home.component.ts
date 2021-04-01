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
  open(){
    document.getElementById('hide').style.display='block';
  }
  close(){
    document.getElementById('hide').style.display='none';
  }

    updateList(title:string){
    this.todoService.updateList(title,this.listId).subscribe(()=>{
     this.getLists();
     this.listName=" ";
    })
  }

  deleteList(){
    this.todoService.deleteList(this.listId).subscribe((response)=>{
        this.getLists();
    });
  }
 
  addTask(title:string){
    this.todoService.createTask(title,this.listId).subscribe((response)=>{
        console.log(response);
        this.getLists();
    })
  }

  deleteTask(taskId){
 
      if(this.listId && taskId){
      this.todoService.deleteTask(this.listId,taskId).subscribe(()=>{
        this.getLists();
      })
    }
    
  }

  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
  
}
