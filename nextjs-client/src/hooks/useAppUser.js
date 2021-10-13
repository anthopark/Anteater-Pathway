import { useState, useEffect } from "react";

class AppUser {
  constructor() {
    // years are two-digit number. ex. 21, 22
    this._academicYears = [];
  }

  get academicYears() {
    return [...this._academicYears];
  }

  addAcademicYear(year) {
    if (!this._academicYears.includes(year)) {
      this._academicYears.push(year);
      this._academicYears.sort((prev, next) => prev - next);
    }
  }

  removeAcademicYear(year) {
    if (this._academicYears.includes(year)) {
      this._academicYears.splice(index, 1);
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
