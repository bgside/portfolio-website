/**
 * {{PROJECT_NAME}} - {{FILE_DESCRIPTION}}
 * 
 * Author: {{AUTHOR_NAME}}
 * Created: {{CREATION_DATE}}
 * Last Modified: {{LAST_MODIFIED}}
 * 
 * Description: {{DETAILED_DESCRIPTION}}
 * 
 * Dependencies:
 * - {{DEPENDENCY_1}}
 * - {{DEPENDENCY_2}}
 * 
 * @version {{VERSION}}
 * @license MIT
 */

// ================================
// IMPORTS & DEPENDENCIES
// ================================
{{IMPORTS}}

// ================================
// CONSTANTS & CONFIGURATION
// ================================

/**
 * Application configuration constants
 * These values can be modified based on environment needs
 */
const CONFIG = {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  DEFAULT_TIMEOUT: 5000,
  MAX_RETRIES: 3,
  DEBUG_MODE: process.env.NODE_ENV === 'development'
};

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Helper function to format dates consistently
 * @param {Date} date - The date to format
 * @param {string} format - The desired format (ISO, locale, etc.)
 * @returns {string} Formatted date string
 */
const formatDate = (date, format = 'ISO') => {
  // Implementation with clear, readable logic
  try {
    return format === 'ISO' ? date.toISOString() : date.toLocaleDateString();
  } catch (error) {
    console.error('Date formatting error:', error);
    return new Date().toISOString();
  }
};

/**
 * Async function to handle API requests with proper error handling
 * @param {string} endpoint - API endpoint to call
 * @param {Object} options - Request options (method, headers, body)
 * @returns {Promise<Object>} API response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${CONFIG.API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// ================================
// MAIN CLASSES & COMPONENTS
// ================================

/**
 * Main application class that handles core functionality
 * Follows modern JavaScript patterns and best practices
 */
class {{MAIN_CLASS_NAME}} {
  constructor(options = {}) {
    // Initialize with default values and user options
    this.config = { ...CONFIG, ...options };
    this.state = {
      initialized: false,
      data: null,
      loading: false,
      error: null
    };
    
    // Bind methods to maintain context
    this.init = this.init.bind(this);
    this.handleError = this.handleError.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  /**
   * Initialize the application
   * Sets up event listeners and loads initial data
   */
  async init() {
    try {
      this.updateState({ loading: true, error: null });
      
      // Perform initialization tasks
      await this.loadInitialData();
      this.setupEventListeners();
      
      this.updateState({ 
        initialized: true, 
        loading: false 
      });
      
      console.log('Application initialized successfully');
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }

  /**
   * Load initial data required for the application
   */
  async loadInitialData() {
    try {
      const data = await apiRequest('/api/initial-data');
      this.updateState({ data });
    } catch (error) {
      throw new Error('Failed to load initial data');
    }
  }

  /**
   * Set up event listeners for user interactions
   */
  setupEventListeners() {
    // Event delegation for better performance
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Window events
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('beforeunload', this.cleanup.bind(this));
  }

  /**
   * Handle click events with event delegation
   * @param {Event} event - Click event object
   */
  handleClick(event) {
    // Use data attributes for clean event handling
    const action = event.target.dataset.action;
    
    switch (action) {
      case 'submit':
        this.handleSubmit(event);
        break;
      case 'cancel':
        this.handleCancel(event);
        break;
      default:
        // Handle other click events
        break;
    }
  }

  /**
   * Update application state immutably
   * @param {Object} newState - State updates to apply
   */
  updateState(newState) {
    this.state = { ...this.state, ...newState };
    this.render(); // Trigger re-render if needed
  }

  /**
   * Centralized error handling
   * @param {string} message - Error message
   * @param {Error} error - Error object
   */
  handleError(message, error) {
    console.error(`${message}:`, error);
    this.updateState({ 
      error: message, 
      loading: false 
    });
    
    // Could integrate with error reporting service here
    // this.reportError(message, error);
  }

  /**
   * Clean up resources when app is closing
   */
  cleanup() {
    // Remove event listeners
    // Clear timers
    // Close connections
    console.log('Cleaning up resources...');
  }
}

// ================================
// MODULE EXPORTS & INITIALIZATION
// ================================

/**
 * Initialize the application when DOM is ready
 * Follows modern async/await patterns
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const app = new {{MAIN_CLASS_NAME}}();
    await app.init();
    
    // Make app globally available for debugging (development only)
    if (CONFIG.DEBUG_MODE) {
      window.app = app;
    }
  } catch (error) {
    console.error('Failed to start application:', error);
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { {{MAIN_CLASS_NAME}}, CONFIG };
}

/**
 * Personal coding philosophy reflected in this code:
 * 
 * 1. Clear, descriptive naming conventions
 * 2. Comprehensive error handling and logging
 * 3. Modern JavaScript features (async/await, destructuring, etc.)
 * 4. Immutable state updates
 * 5. Event delegation for performance
 * 6. Proper cleanup and resource management
 * 7. Extensive documentation and comments
 * 8. Separation of concerns and modularity
 * 9. Configuration-driven approach
 * 10. Development-friendly debugging features
 */