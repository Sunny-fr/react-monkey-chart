import React, {Component} from 'react'
import './charts.scss'



const comparator = (a, b) => typeof a === 'object' ? a.value - b.value : a - b


//<Legend labels={ this.state.labels } colors={ this.state.colors } />


export class Legend extends Component {
    render(){
        const {labels, colors} = this.props
        return (
            <div className="Legend">
                { labels.map((label, labelIndex) => <div>
                    <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
                    <span className="Legend--label">{ label }</span>
                </div>) }
            </div>
        );
    }
}

class Bar extends Component {
    render(){
        const {grouping, layered = false, orientation, transparency = false, color, label, size} = this.props
        const className = 'Charts--item ' + (grouping || '')
        const labelStyle = { color: color }

        const style = {
            backgroundColor: color,
            opacity: !transparency ? 1 : (size / 2 + .5),
            zIndex: 1, //item,
            [orientation === 'horizontal' ? 'width' : 'height']: size + '%',
            //right: layered && orientation !== 'horizontal' ? ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%' : 'auto'
        }

        return (<div className={ className } style={ style }>
                <b style={labelStyle}>{ label }</b>
            </div>
        );
    }
}

export class Chart extends Component {
    render(){
        const {grouping, height, children} = this.props
        const className = 'Charts--serie ' + (grouping || '')
        const style = { height: height || 'auto' }

        return(<div className={className} style={style}>
            {children}
        </div>)
    }
}

export class Charts extends Component {
    render(){

        const {grouping, transparency = false, data, orientation = 'vertical', height} = this.props

        const layered = grouping === 'layered'
        const stacked = grouping === 'stacked'
        let max = data.reduce((prev, serie) => {
            const max = serie.concat().sort(comparator).pop()
            return  max >= prev ? max : prev
        }, 0)

        return (
            <div className={ 'Charts ' + orientation }>
                { data.map((chart, chartIndex) => {
                    const sortedSerie = chart.concat()
                    const sum = chart.reduce((state, current) => state + current, 0)
                    sortedSerie.sort(comparator)

                    return (
                        <Chart key={ chartIndex } grouping={grouping} height={height || 'auto'}>
                            <label>{ chart.label || '' }</label>
                            { chart.map((item, itemIndex) => {
                                const color = item.color || '#43A19E'
                                const size = item / (stacked ? sum : max) * 100

                                return (<Bar transparency={transparency}
                                             layered={layered}
                                             label={item}
                                             size={size}
                                             orientation={orientation}
                                             grouping={grouping}
                                             color={color}
                                             key={ itemIndex } />)

                            }) }
                        </Chart>
                    );
                }) }
            </div>
        );
    }
}


export default Charts

