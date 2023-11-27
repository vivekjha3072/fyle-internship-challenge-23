import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss']
})
export class UserReposComponent {
  username: string = '';
  userData: any = {};
  repos: any[] = [];
  currentPage: number = 1;
  reposPerPageOptions: number[] = [10, 20, 50, 100];
  selectedReposPerPage: number = 10;
  totalRepos:number = 0;
  totalPages:number = 10;

  constructor(private apiService: ApiService) {}

  getUserRepos() {
    this.apiService.getUser(this.username).subscribe(
      (data: any) => {
        this.userData = data;
        this.totalRepos = data.public_repos;
        this.getRepos(); 
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  private getRepos() {
    this.apiService.getRepos(this.username, this.currentPage, this.selectedReposPerPage).subscribe(
      (data: any[]) => {
        this.repos = data;
        this.repos.forEach(repo => {
          this.apiService.getLanguages(repo.languages_url).subscribe(
            (languages: any) => {
              console.log(`Languages for ${repo.name}:`, languages);
              repo.languages = languages;
            },
            error => {
              console.error(`Error fetching languages for ${repo.name}:`, error);
            }
          );
        });
      },
      error => {
        console.error('Error fetching repositories:', error);
      }
    );
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getRepos();
  }

  onReposPerPageChange() {
    this.currentPage = 1;
    this.getRepos();
  }
  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    this.totalPages = Math.ceil(this.totalRepos / this.selectedReposPerPage);

    if (this.totalPages <= 9) {
      // If there are 9 or fewer pages, display all page numbers
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If there are more than 9 pages, display the current set of 9 pages
      const startPage = Math.max(1, this.currentPage - 4);
      const endPage = Math.min(startPage + 8, this.totalPages);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }
}