import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
    console.log(this.carsListTarget)
    this.displayCard()
  }

  createCar(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const car = Object.fromEntries(data.entries());
    console.log({ car });
    fetch("https://wagon-garage-api.herokuapp.com/811/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(car)
    })
      .then(() => this.displayCard())
  }

// verb: POST
//   url: https://wagon-garage-api.herokuapp.com/:garage/cars
//   headers: Content-Type: application / json
// body:
// {
//   "brand": "PEUGEOT",
//     "model": "106",
//       "owner": "ssaunier",
//         "plate": "123AZ56"
// }

  displayCard() {
    this.carsListTarget.innerHTML = ""
    fetch("https://wagon-garage-api.herokuapp.com/811/cars")
      .then(response => response.json())
      .then((data) => {
        data.forEach((car) => {
          console.log(car)
          const card = `
            <div class="car">
              <div class="car-image">
                <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
              </div>
              <div class="car-info">
                <h4>${car.brand} ${car.model}</h4>
                <p><strong>Owner:</strong> ${car.owner}</p>
                <p><strong>Plate:</strong> ${car.plate}</p>
              </div>
            </div>
          `
          this.carsListTarget.insertAdjacentHTML('beforeend', card)
        })
      })
  }
}
