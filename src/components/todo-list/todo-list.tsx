import { Component,h, Prop, State, Listen } from "@stencil/core";

@Component({
    tag: "rj-todo-list",
    styleUrl: "./todo-list.css",
    shadow: true
})
export class TodoList{

    itemInput : HTMLInputElement;

    @Prop() listName : string;

    @State() todoItems: { title: string, done: boolean, id:number }[] = [
        //{ title: "Items One", done: true, id:0 }
    ];


    addListItem(event: Event){
        event.preventDefault();
        let title = this.itemInput.value;

        if (title.trim() != ""){
            this.todoItems = [
                ...this.todoItems,
                { title: title, done: false, id:1 }
            ];
            this.itemInput.value = "";
        }
    }

    
    componentWillLoad() {
        console.log('componentWillLoad');
    }
    componentDidLoad() {
        console.log('componentDidLoad');
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    componentDidUnload() {
        console.log('componentDidUnload');
    }

    @Listen('rjitemRemoved')
    onItemRemoved(event: CustomEvent){
        if (event.detail.trim() != ""){
            console.log("removeitem--x2");
            
            this.todoItems = this.todoItems.splice(1, this.todoItems.length);
        }
    }

    @Listen('rjitemDone')
    onItemDoneEvent(event: CustomEvent) {
        if (event.detail.trim() != "") {
            for (let x = 0; x < this.todoItems.length; x++) {
                if (this.todoItems[x].title == event.detail){
                    this.todoItems[x].done = !this.todoItems[x].done;
                }
            }
        }
    }

    render(){
        let totalItems = this.todoItems.length;
        let done=0,pending = 0
        for (let x = 0; x < this.todoItems.length; x++){
            if (this.todoItems[x].done){
                done++;
            }else{
                pending++;
            }
        }
        return[
                <header>
                    <h3>Title: {this.listName}</h3>
                <p>Total items: {totalItems}</p>
                <p>Done items: {done}, Pending items: {pending}</p>
                </header>,
                <form onSubmit={this.addListItem.bind(this)}>
                    <input
                        type="text"
                        placeholder="Add new item.."
                    ref={el => { this.itemInput = el}}
                    />
                    <button type="submit">
                        +
                    </button>
                </form>,
                <form>
                    <ul>
                        {this.todoItems.map(item => {
                            return (
                                <todo-item
                                    item-name={item.title}
                                    item-status={item.done}
                                    item-index={item.id}
                                 />
                            )
                        })}
                    </ul>
                </form>
        ]
    }

}