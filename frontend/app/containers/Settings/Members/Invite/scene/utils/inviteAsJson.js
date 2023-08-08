export const inviteAsJSON = (objectForm) => {
  return {
    user: {
      first_name: objectForm.firstName,
      last_name: objectForm.lastName,
      email: objectForm.email,
    },
    role: objectForm.role,
  };
};
