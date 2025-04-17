const universitiesData = [
  {
    id: 10,
    universities: [
      {
        university: "Lahore University of Management Sciences (LUMS)",
        semester_fee: 250000,
        location: "Lahore"
      },
      {
        university: "University of the Punjab",
        semester_fee: 180000,
        location: "Lahore"
      },
      {
        university: "National University of Sciences and Technology (NUST)",
        semester_fee: 170000,
        location: "Rawalpindi"
      }
    ]
  },
  {
    id: 12,
    universities: [
      {
        university: "Institute of Business Administration (IBA)",
        semester_fee: 160000,
        location: "Karachi (with campuses in Punjab)"
      },
      {
        university: "COMSATS University Islamabad",
        semester_fee: 150000,
        location: "Lahore"
      },
      {
        university: "University of Management and Technology (UMT)",
        semester_fee: 145000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 14,
    universities: [
      {
        university: "FAST-NUCES",
        semester_fee: 140000,
        location: "Lahore"
      },
      {
        university: "Information Technology University (ITU)",
        semester_fee: 135000,
        location: "Lahore"
      },
      {
        university: "Government College University (GCU)",
        semester_fee: 130000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 16,
    universities: [
      {
        university: "University of Engineering and Technology (UET)",
        semester_fee: 125000,
        location: "Lahore"
      },
      {
        university: "University of South Asia",
        semester_fee: 120000,
        location: "Lahore"
      },
      {
        university: "University of Science and Technology (UST)",
        semester_fee: 110000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 18,
    universities: [
      {
        university: "Lahore College for Women University (LCWU)",
        semester_fee: 100000,
        location: "Lahore"
      },
      {
        university: "University of Gujrat",
        semester_fee: 95000,
        location: "Gujrat"
      },
      {
        university: "University of Central Punjab (UCP)",
        semester_fee: 90000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 20,
    universities: [
      {
        university: "National College of Arts (NCA)",
        semester_fee: 85000,
        location: "Lahore"
      },
      {
        university: "Government College for Boys",
        semester_fee: 80000,
        location: "Lahore"
      },
      {
        university: "The Islamia University of Bahawalpur",
        semester_fee: 75000,
        location: "Bahawalpur"
      }
    ]
  },
  {
    id: 22,
    universities: [
      {
        university: "University of Sargodha",
        semester_fee: 70000,
        location: "Sargodha"
      },
      {
        university: "Bahauddin Zakariya University",
        semester_fee: 65000,
        location: "Multan"
      },
      {
        university: "University of Agriculture",
        semester_fee: 60000,
        location: "Faisalabad"
      }
    ]
  },
  {
    id: 24,
    universities: [
      {
        university: "University of Faisalabad",
        semester_fee: 58000,
        location: "Faisalabad"
      },
      {
        university: "Punjab College of Commerce (PCC)",
        semester_fee: 55000,
        location: "Lahore"
      },
      {
        university: "University of Multan",
        semester_fee: 54000,
        location: "Multan"
      }
    ]
  },
  {
    id: 26,
    universities: [
      {
        university: "University of Chakwal",
        semester_fee: 52000,
        location: "Chakwal"
      },
      {
        university: "University of Balochistan",
        semester_fee: 50000,
        location: "Balochistan (but with students from Punjab)"
      },
      {
        university: "University of Layyah",
        semester_fee: 48000,
        location: "Layyah"
      }
    ]
  },
  {
    id: 28,
    universities: [
      {
        university: "University of Rawalpindi",
        semester_fee: 46000,
        location: "Rawalpindi"
      },
      {
        university: "The University of Azad Jammu & Kashmir",
        semester_fee: 45000,
        location: "Mirpur"
      },
      {
        university: "The University of Lahore",
        semester_fee: 44000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 30,
    universities: [
      {
        university: "Pak-Turk Maarif International Schools & Colleges",
        semester_fee: 43000,
        location: "Lahore"
      },
      {
        university: "Foundation University Rawalpindi",
        semester_fee: 42000,
        location: "Rawalpindi"
      },
      {
        university: "International Islamic University",
        semester_fee: 40000,
        location: "Islamabad (with students from Punjab)"
      }
    ]
  },
  {
    id: 32,
    universities: [
      {
        university: "University of Rawalakot",
        semester_fee: 39000,
        location: "Rawalakot"
      },
      {
        university: "Government College University Faisalabad",
        semester_fee: 38000,
        location: "Faisalabad"
      },
      {
        university: "Indus University",
        semester_fee: 37000,
        location: "Lahore"
      }
    ]
  },
  {
    id: 34,
    universities: [
      {
        university: "Sargodha University",
        semester_fee: 36000,
        location: "Sargodha"
      },
      {
        university: "Ameer-Ul-Momin University",
        semester_fee: 35000,
        location: "Lahore"
      },
      {
        university: "Gomal University",
        semester_fee: 34000,
        location: "Dera Ismail Khan"
      }
    ]
  },
  {
    id: 36,
    universities: [
      {
        university: "University of Dera Ghazi Khan",
        semester_fee: 32000,
        location: "Dera Ghazi Khan"
      },
      {
        university: "Riphah International University",
        semester_fee: 30000,
        location: "Lahore"
      },
      {
        university: "Shah Abdul Latif University",
        semester_fee: 29000,
        location: "Khairpur"
      }
    ]
  },
  {
    id: 38,
    universities: [
      {
        university: "UET Taxila",
        semester_fee: 28000,
        location: "Taxila"
      },
      {
        university: "Iqra University",
        semester_fee: 27000,
        location: "Islamabad (campuses in Punjab)"
      },
      {
        university: "National University of Modern Languages (NUML)",
        semester_fee: 25000,
        location: "Lahore"
      }
    ]
  }
];

export default universitiesData;