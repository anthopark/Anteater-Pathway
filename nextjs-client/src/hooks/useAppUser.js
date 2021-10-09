import { useState, useEffect } from "react";

class AppUser {
  constructor() {
    // years are two-digit number. ex. 21, 22
    this.academicYears = [];
  }

  addAcademicYear(year) {
    this.academicYears.push(year);
    this.academicYears.sort((prev, next) => prev - next);
  }

  removeAcademicYear(year) {
    const index = this.academicYears.indexOf(year);
    if (index !== -1) {
      this.academicYears.splice(index, 1);
    }
  }
}

export const useAppUser = () => {
  const [appUser, setAppUser] = useState(null);
  useEffect(() => {
    setAppUser(new AppUser());
  }, []);
  return { appUser, setAppUser };
};
