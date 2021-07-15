import React from "react";
import ReactDOM from "react-dom";

interface Props {

}

interface State {
  miliseconds:number,
  title:string,
  render:boolean;
}


export class ReactDraggableWindow extends React.Component<Props,State> {

  private isActive: boolean = false;
  private currentX: number = 0;
  private currentY: number = 0;
  private initialX: number = 0;
  private initialY: number = 0;
  private xOffset = 0;
  private yOffset = 0;

  private template = (
    <div className="window">
    <div className="header">
      <p className="title">{this.state.title}</p>
      <button className="exitButton" onClick={() => this.removeComponent()}>X</button>
    </div>
    miliseconds : {this.state.miliseconds}
  </div>
  );

  //react var
  private interval:NodeJS.Timeout|undefined;

  constructor(props:Props) {
    super(props);
    this.state = {
      miliseconds:0,
      title:"test",
      render:true,
    };

  }

  private tick() {
    this.setState(state => ({
      miliseconds: Date.now(),
    }));
  }

  public componentDidMount() {
    this.interval = setInterval(()=>this.tick(),1000);
  }

  public removeComponent() {
    this.setState({render:false});
  }



  render () {
    return this.state.render ? this.template : <div></div> ;
  }
}


//test   
//react window

export function tempTest() {
  ReactDOM.render(
    <ReactDraggableWindow />,
    document.getElementById('reactContainer')
  )
}
