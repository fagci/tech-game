export class Enemy {
  constructor() {
    this.addComponent(new Components.Health(1000))
  }
}

export class Bullet {
  constructor(direction) {
    this
      .addComponent(new Components.Position())
      .addComponent(new Components.Engine(direction))
      .addComponent(new Components.Mass())
      .addComponent(new Components.SpeedConstraint())
      .addComponent(new Components.Dissolve())
      .addComponent(new Components.Damage())
  }
}