import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from './models/response';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'leetcode-profile-ng'
	urlUserName: string = "poojakulkarni562"
	properties: Map<string, string> = new Map<string, string>()
	username: string = ""
	userRealName: string = ""
	githubUrl: string = ""
	githubIconFill: string = ""
	avatar: string = ""
	countryName: string = ""
	company: string = ""
	website: string = ""

	constructor(
		private httpClient: HttpClient
	) { }

	async ngOnInit() {

		const profile: any = await this.httpClient
			.get(`https://leetprofileserver.herokuapp.com/profile/${this.urlUserName}`, { responseType: 'json' }).toPromise()

		if (profile != null) {
			const userResponse: UserResponse = <UserResponse>profile
			if (userResponse.userProfile != null && userResponse.error == null) {
				this.username = userResponse.userProfile.username
				this.userRealName = userResponse.userProfile.profile.realName
				this.githubUrl = userResponse.userProfile.githubUrl
				if (this.githubUrl) {
					this.githubIconFill = "rgba(0, 0, 0, 0.65)"
				} else {
					this.githubIconFill = "rgba(0, 0, 0, 0.35)"
				}
				this.avatar = userResponse.userProfile.profile.userAvatar
				this.countryName = userResponse.userProfile.profile.countryName
				this.company = userResponse.userProfile.profile.company
				// TODO: fix below
				this.website = userResponse.userProfile.profile.websites[0]

				this.properties.set("countryName", this.countryName)
				this.properties.set("company", this.company)
				this.properties.set("website", this.website)

			} else if (userResponse.error != null) {
				console.log(userResponse.error.errorCode)
				console.log(userResponse.error.errorMessage)
			}
		}

	}

	isPresent(property: string): string {
		let display: string = "none"
		if (this.properties.get(property) != null) {
			display = "flex"
		}
		return display
	}
}
