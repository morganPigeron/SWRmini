export class MouseCoordinate {

  private coor:HTMLElement;

  constructor() {

    this.coor = document.createElement('div');
    this.coor.className="over";
    this.coor.id = "test";
    document.body.appendChild(this.coor);


    document.addEventListener("mousemove", (e) => {
      this.coor.style.left = e.pageX + 20 + "px";
      this.coor.style.top = e.pageY + -20 + "px";
      this.coor.innerHTML = `x:${e.pageX},y:${e.pageY}`;
    })
  }

  public remove() { //TODO check if this can make a leak
    this.coor.remove();
  }
}
