// Defines permissions for different user roles
const permissions = {
    admin: ['viewAdminDashboard', 'editAllProfiles'],
    faculty: ['viewFacultyDashboard', 'manageCourses'],
    student: ['viewStudentDashboard', 'submitAssignments'],
  };
  
  /**
   * Checks if a user has a specific permission.
   * @param {object} user - The user object, which must have a 'role' property.
   * @param {string} requiredPermission - The permission string to check for.
   * @returns {boolean} - True if the user has the permission, false otherwise.
   */
  export const hasPermission = (user, requiredPermission) => {
    if (!user || !user.role) {
      return false;
    }
  
    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes(requiredPermission);
  };