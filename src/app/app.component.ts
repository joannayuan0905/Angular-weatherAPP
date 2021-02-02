import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  apiWeatherData:any[] = [];
  searchItem = '';
  promptMessage = '';
  cardShow = false;

  constructor(private http: HttpClient, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  // 抓取天氣資料api
  getWeatherData() {
    let apiKey = '640abf74f82d425c36776c151fbc7551';
    let apiURL = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.searchItem}&units=metric&appid=${apiKey}`;

    this.http.get<any>(apiURL).subscribe(
      data => {
        console.log(data)
        const card = {
          weatherDescription: data.weather[0].description,
          temperature: Math.round(data.main.temp),
          cityName: data.name,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          imageSrc: this.getWeatherIcon(data.weather[0].main)
        };

        this.apiWeatherData.push(card);
        this.cardShow = true;
        this.searchItem = " ";

      },
      err => {
        console.log('Please search for a valid city!');
        this.searchItem = ''; //若搜尋失敗則會清空欄位
        this.promptMessage = "Please search for a valid city!"

      })
    //搜尋失敗提醒訊息
    if (this.searchItem != '') {
      this.promptMessage = " ";
    }
  }


  // 依據api的天氣狀態來判斷icon
  getWeatherIcon(data: any) {
    switch (data) {
      case 'Clear':
        return `assets/img/Clear.svg`;

      case 'Clouds':
      case 'Mist':
      case 'Fog':
        return  `assets/img/Clouds.svg`;

      case 'Rain':
      case 'Drizzle':
      case 'Haze':
        return `assets/img/Rain.svg`;

      case 'Thunderstorm':
        return `assets/img/Storm.svg`;

      case 'Snow':
        return  `assets/img/Snow.svg`;

      default:
        return  `assets/img/404.svg`;
    }

  }

}
