import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const Chart = ({coin}) => {
console.log(coin.symbol)
 return (
    <TradingViewWidget
        // symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        // locale="fr"
        autosize

        symbol={`BINANCE:` + ((coin.symbol==="usdt" || coin.symbol==="USDT")?coin.symbol+"RUB":coin.symbol+"USDT")}
        interval="5"
        timezone="Asia/Kolkata"
        //   theme= "Dark"
        style="1"
        locale="in"
        toolbar_bg="#f1f3f6"
        enable_publishing={false}
        allow_symbol_change={true}
        studies={[
            "AwesomeOscillator@tv-basicstudies",
            "MACD@tv-basicstudies",
            "RSI@tv-basicstudies"
        ]}
        container_id="tvchart"
    />
)
    };


export default Chart;