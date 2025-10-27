// API Base URL
const API_URL = window.location.origin;

// Charts instances
let uptimeChart = null;
let userActivityChart = null;
let requestsChart = null;
let responseTimeChart = null;

// Data storage for charts
const chartData = {
    uptime: [],
    timestamps: [],
    requests: {
        GET: 0,
        POST: 0,
        PUT: 0,
        DELETE: 0
    },
    responseTimes: [],
    requestsOverTime: []
};

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        // Load data for specific sections
        if (targetId === 'users') {
            loadUsers();
        } else if (targetId === 'dashboard') {
            loadDashboardData();
        }
    });
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Load Dashboard Data
async function loadDashboardData() {
    try {
        // Health check
        const healthRes = await fetch(`${API_URL}/health`);
        const health = await healthRes.json();
        
        document.getElementById('server-status').textContent = health.status === 'ok' ? '✅ Online' : '❌ Offline';
        document.getElementById('uptime').textContent = Math.floor(health.uptime);
        
        // User count
        const usersRes = await fetch(`${API_URL}/api/users`);
        const usersData = await usersRes.json();
        document.getElementById('user-count').textContent = usersData.count || 0;
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        document.getElementById('server-status').textContent = '❌ Error';
    }
}

// Load Users
async function loadUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '<p class="loading">Loading users...</p>';
    
    try {
        const response = await fetch(`${API_URL}/api/users`);
        const data = await response.json();
        
        if (data.users && data.users.length > 0) {
            usersList.innerHTML = data.users.map(user => `
                <div class="user-item" data-id="${user.id}">
                    <div class="user-info">
                        <h4><i class="fas fa-user"></i> ${escapeHtml(user.name)}</h4>
                        <p><i class="fas fa-envelope"></i> ${escapeHtml(user.email)}</p>
                    </div>
                    <div class="user-actions">
                        <button onclick="editUser(${user.id}, '${escapeHtml(user.name)}', '${escapeHtml(user.email)}')" class="btn btn-edit">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteUser(${user.id})" class="btn btn-danger">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            usersList.innerHTML = '<p class="loading">No users found. Add one above!</p>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        usersList.innerHTML = '<p class="loading" style="color: var(--danger);">Error loading users</p>';
        showToast('Error loading users', 'error');
    }
}

// Add User
document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('✅ User added successfully!', 'success');
            document.getElementById('add-user-form').reset();
            loadUsers();
            loadDashboardData(); // Update user count
        } else {
            showToast('❌ ' + (data.error || 'Error adding user'), 'error');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        showToast('❌ Error adding user', 'error');
    }
});

// Edit User
async function editUser(id, currentName, currentEmail) {
    const newName = prompt('New name:', currentName);
    if (!newName) return;
    
    const newEmail = prompt('New email:', currentEmail);
    if (!newEmail) return;
    
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, email: newEmail })
        });
        
        if (response.ok) {
            showToast('✅ User updated successfully!', 'success');
            loadUsers();
        } else {
            const data = await response.json();
            showToast('❌ ' + (data.error || 'Error updating user'), 'error');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        showToast('❌ Error updating user', 'error');
    }
}

// Delete User
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
        const response = await fetch(`${API_URL}/api/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('✅ User deleted successfully!', 'success');
            loadUsers();
            loadDashboardData(); // Update user count
        } else {
            const data = await response.json();
            showToast('❌ ' + (data.error || 'Error deleting user'), 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showToast('❌ Error deleting user', 'error');
    }
}

// Test Endpoint
async function testEndpoint(endpoint) {
    const responseId = 'response-' + endpoint.split('/').pop();
    const responseBox = document.getElementById(responseId);
    
    responseBox.textContent = 'Loading...';
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        responseBox.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseBox.textContent = 'Error: ' + error.message;
    }
}

// Test Hello with Name
async function testHelloName() {
    const name = document.getElementById('hello-name').value || 'Guest';
    const responseBox = document.getElementById('response-hello-name');
    
    responseBox.textContent = 'Loading...';
    
    try {
        const response = await fetch(`${API_URL}/api/hello/${encodeURIComponent(name)}`);
        const data = await response.json();
        responseBox.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        responseBox.textContent = 'Error: ' + error.message;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    loadDashboardData();
    
    // Auto-refresh dashboard every 30 seconds
    setInterval(() => {
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection.classList.contains('active')) {
            loadDashboardData();
            updateCharts();
        }
    }, 30000);
    
    // Update charts every 5 seconds for more dynamic feel
    setInterval(() => {
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection.classList.contains('active')) {
            updateChartsData();
        }
    }, 5000);
});

// Initialize Charts
function initializeCharts() {
    const chartColors = {
        primary: 'rgba(102, 126, 234, 1)',
        primaryLight: 'rgba(102, 126, 234, 0.2)',
        secondary: 'rgba(118, 75, 162, 1)',
        secondaryLight: 'rgba(118, 75, 162, 0.2)',
        success: 'rgba(16, 185, 129, 1)',
        successLight: 'rgba(16, 185, 129, 0.2)',
        warning: 'rgba(245, 158, 11, 1)',
        warningLight: 'rgba(245, 158, 11, 0.2)',
        danger: 'rgba(239, 68, 68, 1)',
        dangerLight: 'rgba(239, 68, 68, 0.2)',
        info: 'rgba(59, 130, 246, 1)',
        infoLight: 'rgba(59, 130, 246, 0.2)'
    };

    // Uptime Chart (Line)
    const uptimeCtx = document.getElementById('uptimeChart');
    if (uptimeCtx) {
        uptimeChart = new Chart(uptimeCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Uptime (seconds)',
                    data: [],
                    borderColor: chartColors.primary,
                    backgroundColor: chartColors.primaryLight,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // User Activity Chart (Pie)
    const userActivityCtx = document.getElementById('userActivityChart');
    if (userActivityCtx) {
        userActivityChart = new Chart(userActivityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Active Users', 'Total Users', 'Guest Sessions'],
                datasets: [{
                    data: [2, 3, 5],
                    backgroundColor: [
                        chartColors.success,
                        chartColors.primary,
                        chartColors.warning
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Requests Chart (Bar)
    const requestsCtx = document.getElementById('requestsChart');
    if (requestsCtx) {
        requestsChart = new Chart(requestsCtx, {
            type: 'bar',
            data: {
                labels: ['GET', 'POST', 'PUT', 'DELETE'],
                datasets: [{
                    label: 'API Requests',
                    data: [45, 23, 12, 8],
                    backgroundColor: [
                        chartColors.info,
                        chartColors.success,
                        chartColors.warning,
                        chartColors.danger
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Response Time Chart (Line)
    const responseTimeCtx = document.getElementById('responseTimeChart');
    if (responseTimeCtx) {
        responseTimeChart = new Chart(responseTimeCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Response Time (ms)',
                    data: [],
                    borderColor: chartColors.success,
                    backgroundColor: chartColors.successLight,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Update Charts with new data
function updateCharts() {
    // Update uptime chart
    if (uptimeChart && chartData.uptime.length > 0) {
        uptimeChart.data.labels = chartData.timestamps;
        uptimeChart.data.datasets[0].data = chartData.uptime;
        uptimeChart.update('none');
    }

    // Update response time chart
    if (responseTimeChart && chartData.responseTimes.length > 0) {
        responseTimeChart.data.labels = chartData.timestamps;
        responseTimeChart.data.datasets[0].data = chartData.responseTimes;
        responseTimeChart.update('none');
    }
}

// Update Charts Data (simulated real-time data)
function updateChartsData() {
    const now = new Date().toLocaleTimeString();
    
    // Simulate uptime data
    chartData.timestamps.push(now);
    if (chartData.timestamps.length > 10) {
        chartData.timestamps.shift();
    }
    
    // Add random uptime increment
    const lastUptime = chartData.uptime[chartData.uptime.length - 1] || 0;
    chartData.uptime.push(lastUptime + 5 + Math.random() * 2);
    if (chartData.uptime.length > 10) {
        chartData.uptime.shift();
    }
    
    // Simulate response times (20-100ms)
    chartData.responseTimes.push(20 + Math.random() * 80);
    if (chartData.responseTimes.length > 10) {
        chartData.responseTimes.shift();
    }
    
    // Update requests chart randomly
    if (requestsChart && Math.random() > 0.7) {
        const methods = ['GET', 'POST', 'PUT', 'DELETE'];
        const randomMethod = methods[Math.floor(Math.random() * methods.length)];
        const currentData = requestsChart.data.datasets[0].data;
        const index = methods.indexOf(randomMethod);
        currentData[index] += 1;
        requestsChart.update('none');
    }
    
    // Update user activity chart randomly
    if (userActivityChart && Math.random() > 0.8) {
        const currentData = userActivityChart.data.datasets[0].data;
        const randomIndex = Math.floor(Math.random() * currentData.length);
        currentData[randomIndex] = Math.max(1, currentData[randomIndex] + (Math.random() > 0.5 ? 1 : -1));
        userActivityChart.update('none');
    }
    
    updateCharts();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    
    // Auto-refresh dashboard every 30 seconds
    setInterval(() => {
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection.classList.contains('active')) {
            loadDashboardData();
        }
    }, 30000);
});
