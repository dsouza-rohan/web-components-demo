import { Component, h, Prop, EventEmitter, Event } from "@stencil/core";


@Component({
    tag:"todo-item",
    styleUrl: "./todo-item.css",
    shadow: true
})
export class TodoItem{

    @Prop() itemName : string;
    @Prop({ reflect: true,mutable:true}) itemStatus: boolean = false;
    @Prop() itemIndex : number;

    @Event({bubbles:false,composed:true}) rjitemRemoved: EventEmitter<string>;
    @Event({ bubbles: false, composed: true }) rjitemDone: EventEmitter<string>;

    componentWillUpdate() {
        console.log('componentWillUpdate');
    }

    itemRemove(name: string){
        this.rjitemRemoved.emit(name);
        
    }

    itemDone(name: string){
        this.itemStatus = this.itemStatus ? false : true;
        this.rjitemDone.emit(name);
    }

    render(){
        let itemStatus = this.itemStatus ? "item-done" : "";
        return (
            <li>
                <span class={itemStatus}>{this.itemName}</span>
                <button 
                    type="button" 
                    onClick={this.itemRemove.bind(this, this.itemName)}>X</button>
                <input 
                    type="checkbox" 
                    onChange={this.itemDone.bind(this, this.itemName)} 
                    checked={this.itemStatus} />
            </li>
        );
    }

}