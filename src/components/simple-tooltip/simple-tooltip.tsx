import { Component, Prop } from "@stencil/core";
import { h } from '@stencil/core';

@Component({
    tag: 'rj-simple-tooltip',
    styleUrl: './simple-tooltip.css',
    shadow: true
})
export class SimpleTooltip {

    @Prop({ reflect: true }) text: string = "Dummy tip";
    
    @Prop({ reflect: true, mutable: true }) show: boolean = false; 

    showHideTip(){
        if (this.show){
            this.show = false;
        }else{
            this.show = true;
        }
    }

    render() {
        let tip_text = <div>{this.text}</div>;
        if (!this.show) {
            tip_text = "";
        }
        return (
            <span>
                <slot>Some default</slot>
                <span class="icon" onClick={this.showHideTip.bind(this)}>?</span>
                {tip_text}
            </span>
        );
    }

}