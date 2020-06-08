import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/global'


@Component({
    tag: "rj-stock-price",
    styleUrl: "./stock-price.css",
    shadow: true
})
export class StockPrice {

    stockInput : HTMLInputElement;

    @Element() el: HTMLElement;

    @State() fetchedPrice : number;
    @State() stockUserInput: string;
    @State() stockUserValid: boolean;
    @State() loading: boolean = false;

    @Prop({mutable:true, reflectToAttr:true}) stockSymbol: string;
    

    @Watch('stockSymbol')
    stockSymbolChange(newValue: string, oldValue: string){
        if (newValue !== oldValue){
            this.fetchStockPrice(newValue);
        }
    }

    onUserInput(event: Event){
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if (this.stockUserInput.trim() != ""){
            this.stockUserValid = true;
        }else{
            this.stockUserValid = false;
        }
    }

    onSubmitHandler(event: Event){
        event.preventDefault();

        // const stockSym = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        const stockSym = this.stockInput.value;

        this.fetchStockPrice(stockSym);
        
        console.log("Submitted..");
    }

    fetchStockPrice(stockSym: string ){
        this.loading = true;
        fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSym}&apikey=${AV_API_KEY}`
        )
            .then(res => {
                return res.json();
            }).then(parsed => {
                //console.log(parsed);

                this.fetchedPrice = +parsed['Global Quote']['05. price'];
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            });
    }

    @Listen('rjSymbolSelected',{target: 'body'})
    onStockSymbolSelected(event: CustomEvent){
        if (event.detail && event.detail !== this.stockSymbol){
            this.fetchStockPrice(event.detail)
            this.stockUserValid = true;
            this.stockSymbol = event.detail;
            this.stockInput.value = event.detail;
        }
        
    }

    componentWillLoad(){
        console.log('componentWillLoad')
        const stockSym = this.stockInput.value;
        this.fetchStockPrice(stockSym);
    }
    componentDidLoad() {
        console.log('componentDidLoad')
     }
    componentWillUpdate() {
        console.log('componentWillUpdate')
     }
    componentDidUpdate() { 
        console.log('componentDidUpdate')
    }
    componentDidUnload() { 
        console.log('componentDidUnload')
    }
    hostData() {
        return { class: this.stockUserValid ? "" : "error"}
    }

    render(){
        let dataContent = <p>Please enter a symbol!!</p>

        if (this.fetchedPrice){
            dataContent = <p>Price: {this.fetchedPrice}%</p>
        }
        if(this.loading){
            dataContent = <rj-spinner />
        }

        return[
            <form onSubmit={this.onSubmitHandler.bind(this)}>
                <input type="text" 
                ref={el => this.stockInput = el} 
                id="stock-symbol"
                value={this.stockUserInput}
                    onInput={this.onUserInput.bind(this)} />
                <button type="submit" disabled={!this.stockUserValid || this.loading}>Fetch</button>
            </form>
            ,
            <div>
                {dataContent}
            </div>
        ];
    }
}