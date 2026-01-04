import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-detail-container">
      <div class="back-link">
        <a routerLink="/users">← Back to Users</a>
      </div>

      @if (userQuery.isPending()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading user details...</p>
        </div>
      } @else if (userQuery.isError()) {
        <div class="error-state">
          <p>Error loading user details.</p>
          <a routerLink="/users">Return to list</a>
        </div>
      } @else if (userQuery.data(); as u) {
        <div class="profile-header">
          <div class="profile-cover"></div>
          <div class="profile-info-main">
            <div class="large-avatar">
              {{ u.name.charAt(0) }}
            </div>
            <div class="name-section">
              <h1>{{ u.name }}</h1>
              <p class="handle">@{{ u.username }}</p>
            </div>
            <div class="action-buttons">
              <button class="primary-btn">Message</button>
              <button class="secondary-btn">Edit Profile</button>
            </div>
          </div>
        </div>

        <div class="profile-grid">
          <div class="info-card">
            <h3>Contact Information</h3>
            <div class="info-item">
              <span class="icon">📧</span>
              <div>
                <label>Email</label>
                <p>{{ u.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="icon">📱</span>
              <div>
                <label>Phone</label>
                <p>{{ u.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <span class="icon">🌐</span>
              <div>
                <label>Website</label>
                <p>{{ u.website }}</p>
              </div>
            </div>
          </div>

          <div class="info-card">
            <h3>Work & Address</h3>
            <div class="info-item">
              <span class="icon">🏢</span>
              <div>
                <label>Company</label>
                <p>{{ u.company.name }}</p>
                <small>{{ u.company.catchPhrase }}</small>
              </div>
            </div>
            <div class="info-item">
              <span class="icon">📍</span>
              <div>
                <label>Address</label>
                <p>{{ u.address.street }}, {{ u.address.suite }}</p>
                <p>{{ u.address.city }}, {{ u.address.zipcode }}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-detail-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
      animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .back-link {
      margin-bottom: 2rem;
    }

    .back-link a {
      color: #6366f1;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .back-link a:hover {
      color: #4f46e5;
    }

    .profile-header {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;
      border: 1px solid #f1f5f9;
    }

    .profile-cover {
      height: 160px;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    }

    .profile-info-main {
      padding: 0 2rem 2rem;
      display: flex;
      align-items: flex-end;
      gap: 2rem;
      margin-top: -60px;
      position: relative;
    }

    .large-avatar {
      width: 120px;
      height: 120px;
      background: #f8fafc;
      border: 6px solid white;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 800;
      color: #6366f1;
      box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
    }

    .name-section {
      flex: 1;
      padding-bottom: 0.5rem;
    }

    .name-section h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #1e293b;
      margin: 0;
    }

    .handle {
      color: #6366f1;
      font-weight: 600;
      margin: 0;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      padding-bottom: 1rem;
    }

    .primary-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .primary-btn:hover {
      background: #4f46e5;
      transform: translateY(-2px);
    }

    .secondary-btn {
      background: #f1f5f9;
      color: #475569;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .secondary-btn:hover {
      background: #e2e8f0;
    }

    .profile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid #f1f5f9;
    }

    .info-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f1f5f9;
    }

    .info-item {
      display: flex;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .icon {
      font-size: 1.5rem;
      background: #f8fafc;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
    }

    .info-item label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }

    .info-item p {
      margin: 0;
      color: #334155;
      font-weight: 500;
    }

    .info-item small {
      color: #64748b;
      font-style: italic;
    }

    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
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

    @media (max-width: 768px) {
      .profile-info-main {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: -60px;
      }
      
      .name-section {
        padding: 0;
      }

      .action-buttons {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class UserDetailComponent {
  private usersService = inject(UsersService);
  private queryClient = inject(QueryClient);

  id = input<string>();

  userQuery = injectQuery(() => ({
    queryKey: ['user', this.id()],
    queryFn: () => this.usersService.getUser(Number(this.id())),
    enabled: !!this.id(),
    initialData: () => {
      const users = this.queryClient.getQueryData<User[]>(['users']);
      return users?.find(u => u.id === Number(this.id()));
    },
    initialDataUpdatedAt: () => this.queryClient.getQueryState(['users'])?.dataUpdatedAt,
  }));
}
