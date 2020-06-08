import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from '../../global/global'

@Component({
    tag: "rj-stock-finder",
    styleUrl: "./stock-finder.css",
    shadow: true
})
export class StockFinder{

    stockNameInput: HTMLInputElement;

    @Event({bubbles:true, composed: true}) rjSymbolSelected: EventEmitter<string>;
    

    @State() searchResults : {symbol:string,name:string}[] = [];

    onFindStock(event: Event){
        event.preventDefault();

        const stockName = this.stockNameInput.value;

        fetch(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`
            )
            .then(res => res.json())
            .then(parsRes => {
                //console.log(parsRes);

                this.searchResults = parsRes['bestMatches'].map(match => {
                    return { name: match['2. name'], symbol: match['1. symbol']};
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onSelectSymbol(sysmbol: string){
        this.rjSymbolSelected.emit(sysmbol)
    }

    render(){
        return[
            <form onSubmit={this.onFindStock.bind(this)}>
                <input 
                    type="text"
                    id="stock-symbol"
                    ref={el => { this.stockNameInput = el}}
                />
                <button type="submit">
                    Find
                </button>
            </form>,
            <ul>
                {this.searchResults.map(result =>(
                    <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
                        <strong>{result.symbol}</strong>{result.name}
                    </li>
                ))}
            </ul>
            
        ];
    }
}