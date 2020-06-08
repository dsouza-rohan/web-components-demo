import { Component, Prop, State, Method } from "@stencil/core";
import { h } from '@stencil/core';

@Component({
    tag: 'rj-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {

    @State() showContactInfor = true;


    @Prop({ reflect: true }) titlename: string;

    @Prop({ reflect: true, mutable:true }) opened: boolean = false;

    onCloseDrawer(){
        this.opened = false;
    }

    onContenChange(content: string){
        this.showContactInfor = content === "contact";
    }

    @Method()
    open(){
        this.opened = true;
        
    }

    render(){
        let mainContent = <slot />;
        if (this.showContactInfor){
            mainContent = (
                <div id="contact-info">
                    <h2>Contact Information</h2>
                    <ul>
                        <li>Phone: 11445 25235</li>
                        <li>Email: <a href="test@gmail.com">test@gmail.com</a></li>
                    </ul>
                </div>
            );
        }
       
        return [
            <div id="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
            <aside>
                <header>
                    <h2>{this.titlename}</h2>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button 
                        class={!this.showContactInfor ? "active" : "" }
                        onClick={this.onContenChange.bind(this, "navs")}>
                        Links
                        </button>
                    <button 
                        class={this.showContactInfor ? "active" : ""}
                        onClick={this.onContenChange.bind(this,"contact")}>
                        Contacts
                        </button>
                </section>

                <main>
                    {mainContent}
                </main>

            </aside>
        ];
    }
}