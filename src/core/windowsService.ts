export class DraggableWindow {
  private container: HTMLElement;
  private dragItem: HTMLElement;
  private title: HTMLElement;
  private exitButton: HTMLElement;
  private isActive: boolean = false;
  private currentX: number = 0;
  private currentY: number = 0;
  private initialX: number = 0;
  private initialY: number = 0;
  private xOffset = 0;
  private yOffset = 0;

  constructor(windowName:string) {

    //create container
    this.container = document.createElement('div');
    this.container.className = 'window';
    this.container.id = `container_${Date.now()}`;
    document.body.appendChild(this.container);

    //create draggable
    this.dragItem = document.createElement('div');
    this.dragItem.className = 'header';
    this.dragItem.id = `draggable_${Date.now()}`;
    this.container.appendChild(this.dragItem);

    //create title
    this.title = document.createElement('p');
    this.title.className = 'title';
    this.title.innerHTML = windowName;
    this.dragItem.appendChild(this.title);

    //create exitButton
    this.exitButton = document.createElement('button');
    this.exitButton.className = 'exitButton';
    this.exitButton.addEventListener("click", (e)=>{this.container.remove()});
    this.exitButton.innerHTML = 'X';
    this.dragItem.appendChild(this.exitButton);

    //add drag listener
    this.container.addEventListener(
      "mousedown",
      (e) => this.dragStart(e as MouseEvent),
      false
    );
    this.container.addEventListener(
      "mouseup",
      (e) => this.dragEnd(e as MouseEvent),
      false
    );
    this.container.addEventListener(
      "mousemove",
      (e) => this.drag(e as MouseEvent),
      false
    );
  }

  private dragStart(e: MouseEvent) {
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (e.target === this.dragItem) {
      this.isActive = true;
    }
  }

  private dragEnd(e: MouseEvent) {
    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.isActive = false;
  }

  private drag(e: MouseEvent) {
    if (this.isActive) {
      e.preventDefault();

      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setTranslate(this.currentX, this.currentY, this.container!);
    }
  }

  private setTranslate(xPos: number, yPos: number, el: HTMLElement) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}
