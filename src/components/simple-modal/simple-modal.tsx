import { Component, Prop, Method } from "@stencil/core";
import { h } from '@stencil/core';

@Component({
    tag: 'rj-simple-modal',
    styleUrl: './simple-modal.css',
    shadow: true
})
export class SimpleModal {
    
    @Prop({ reflect: true,mutable: true }) opened = false;

    @Method()
    open() {
        this.opened = true;
    }

    @Method()
    close() {
        if (this.opened) {
            this.opened = false;
        }
    }
    _cancel(event) {
        console.log(event)
        //todo; 
        this.close();
    }
    _confirm(event) {
        console.log(event)
        //todo; 
        this.close();
    }
    

    render() {
        return (
            <div>
                <div id="backdrop"></div>
                <div id="modal">
                    <header>
                        <slot name="title"></slot>
                    </header>
                    <section id="main">
                        <slot></slot>
                    </section>
                    <section id="action">
                        <button id="cancel" onClick={this._cancel.bind(this)}>Cancel</button>
                        <button id="confirm" onClick={this._confirm.bind(this)}>Okay</button>
                    </section>
                </div>
            </div>
        );
    }
}