import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/matchedUser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'leetcode-profile-ng';

	constructor(
		private httpClient: HttpClient
	) { }

	async ngOnInit() {
		const profile: any = await this.httpClient
			.get("https://leetcode-profile-lib.herokuapp.com/leetprofile/poojakulkarni562", { responseType: 'json' }).toPromise()
		let user: User = <User>profile
		console.log(user)

	}
}
