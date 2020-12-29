import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

interface itemData{
    id:number,
    title:string,
    done:boolean
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos:itemData[] = JSON.parse(localStorage.getItem('todos') || '[]');
  public currentEdit:itemData=null;
  public visibility:string = 'all';


  //该函数是一个特殊的 angular 生命周期钩子函数  他会在angular应用初始化的时候执行一次
  ngOnInit(): void {
    //初始化时手动调用一次  记录当前的所在hash下的todos
    this.hashChangeHandle()

    //注意  这里 要bind this绑定
    window.onhashchange =  this.hashChangeHandle.bind(this)
  }

  //数据本地持久化 在 ngDoCheck 生命周期钩子中进行  该钩子是组件发生改变时执行
  ngDoCheck(): void {
    window.localStorage.setItem('todos',JSON.stringify(this.todos))
  }

  // 实现导航切换数据过滤的功能
  // 1. 提供一个属性，该属性会根据当前点击的链接返回过滤之后的数据
  //   filterTodos
  // 2. 提供一个属性，用来存储当前点击的链接标识
  //    visibility 字符串
  //    all、active、completed
  // 3. 为链接添加点击事件，当点击导航链接的时候，改变
  //底部按钮切换，根据不同按钮显示不同状态的todos
  get filterTodos(){
    if (this.visibility === 'all') {
      return this.todos;
    }else if(this.visibility === 'active') {
      return this.todos.filter(v=>!v.done)
    }else{
      return this.todos.filter(v=>v.done)
    }
  }

  //添加数据
  addData(e){
    console.log(e)
    if(e.target.value.length===0){
      return ;
    }
    this.todos.push({
      id:Date.now(),
      title:e.target.value,
      done:false
    })
    e.target.value = '';
  }

  //全选 按钮  get访问器
  get checkAll(){
    //every  如果数组中的每一项都满足条件 则返回true  只要有一项不满足 就返回false
    return this.todos.every(item=>item.done)
  }

  //全选按钮的change事件   set赋值器
  set checkAll(val){
    this.todos.forEach(v=>v.done = val)
  }

  //删除数据
  removeData(index){
    this.todos.splice(index,1)
  }

  //编辑数据
  editData(e,todo){
    console.log()
    if(e.target.value.length === 0){

    }
    else{
      //保存
      todo.title = e.target.value;
      //取消编辑样式
      this.currentEdit = null;
    }
  }
  //取消编辑
  escData(e,todo){
    if(e.keyCode === 27) {
      //取消编辑样式  同时把文本框的值改为原来的值
      e.target.value = this.currentEdit.title;
      this.currentEdit = null;
    }
  }

  //未完成数据
  get remainingCount(){
    return this.todos.filter(v=>!v.done).length
  }

  //删除所有已完成
  deleterData(){
    this.todos = this.todos.filter(v=>!v.done)
  }

  //hash改变事件 （即url改变事件）
  hashChangeHandle(){
    let {hash} = window.location;
      hash = hash.substr(1)
      switch(hash){
        case '/active':
          this.visibility = 'active';
          break;
        case '/completed':
          this.visibility ='completed';
          break;
        default:
          this.visibility ='all'
          break;
      }
      // console.log(this.visibility)
  }

  

  
}
