import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-list-container">
      <header class="header">
        <h1>Users</h1>
        <p>Manage your team members and their roles</p>
        
        <div class="controls">
          <button 
            class="sort-badge" 
            [class.active]="isSortedAZ()"
            (click)="toggleSort()">
            <span class="icon">{{ isSortedAZ() ? 'sorted' : 'sort' }}</span>
            Name A - Z
          </button>
        </div>
      </header>

      @if (usersQuery.isPending()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading users...</p>
        </div>
      } @else if (usersQuery.isError()) {
        <div class="error-state">
          <p>Error loading users. Please try again later.</p>
        </div>
      } @else {
        <div class="user-grid">
          @for (user of sortedUsers(); track user.id) {
            <div class="user-card" [routerLink]="['/users', user.id]">
              <div class="user-avatar">
                {{ user.name.charAt(0) }}
              </div>
              <div class="user-info">
                <h3>{{ user.name }}</h3>
                <p class="username">@{{ user.username }}</p>
                <p class="email">{{ user.email }}</p>
              </div>
              <div class="user-footer">
                <span class="company">{{ user.company.name }}</span>
                <button class="view-btn">View Profile</button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .user-list-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      margin-bottom: 3rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header h1 {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .header p {
      color: #64748b;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .sort-badge {
      background: white;
      border: 1px solid #e2e8f0;
      padding: 0.5rem 1rem;
      border-radius: 99px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .sort-badge:hover {
      border-color: #6366f1;
      color: #6366f1;
    }

    .sort-badge.active {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
      box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .user-card {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      border: 1px solid #f1f5f9;
      position: relative;
      overflow: hidden;
    }

    .user-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: #6366f1;
    }

    .user-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #a855f7);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .user-card:hover::before {
      opacity: 1;
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
      color: #6366f1;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .user-info h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.25rem;
    }

    .username {
      color: #6366f1;
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .email {
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .user-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #f1f5f9;
    }

    .company {
      font-size: 0.8rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .view-btn {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #475569;
      padding: 0.5rem 1rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .user-card:hover .view-btn {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
    }

    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }

    .error-state p {
      color: #ef4444;
      font-weight: 600;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class UserListComponent {
  private usersService = inject(UsersService);

  usersQuery = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => this.usersService.getUsers(),
  }));

  isSortedAZ = signal(true);

  sortedUsers = computed(() => {
    const list = [...(this.usersQuery.data() || [])];
    if (this.isSortedAZ()) {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  });

  toggleSort() {
    this.isSortedAZ.update(v => !v);
  }
}
