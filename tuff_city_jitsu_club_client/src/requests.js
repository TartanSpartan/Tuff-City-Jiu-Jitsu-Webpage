//const REACT_APP_BASE_URL = `http://localhost:3000/api/v1`;

function getJwt(){
  return localStorage.getItem("jwt");
}

// Determine whether to introduce authorisation in headers based on JWT

export const Token = {
  create (params) {
    return fetch(
      `${REACT_APP_BASE_URL}/api/v1/tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }
     ).then(res => {
       if (res.status === 200) {
         return res.json();
       } else {
         return {error: "Something went wrong!"};
       }
     });
  }
}

// Handling fetch requests for sessions, users etc

export const Syllabus = {
  // Fetch one syllabus from the server
  one(id) {
    return fetch(`${process.env.REACT_APP_REACT_APP_BASE_URL}/syllabi/${id}`, {
      credentials: "include",
    }).then((res) => res.json());
  },

  // Fetch all syllabi from the server
  all(params) {
    return fetch(
      `${process.env.REACT_APP_BASE_URL}/syllabi/${params.id}/syllabi_full?user_id=${encodeURIComponent(params.user_id)}`,
      {
        credentials: "include"
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  },

  // try .then chaining (i.e. at the end), then console.log the return value, because not all of the syllabus is being returned
};

export const Video = {
  // Fetch all videos from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos`, {
      credentials: "include",
    }).then((res) => res.json());
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}`, {
      credentials: "include",
    }).then((res) => {
      console.log("This is the find video response", res);
      return res.json();
    });
  },

  group(id) { // Search based on the technique_id
    return fetch (`${process.env.REACT_APP_BASE_URL}/techniques/${id}/videos`, {
      credentials: "include",
    }).then((res) => {
      console.log("This is the group search video response", res);
      return res.json();
    });
  },

  // Destroy a video
  destroy(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());
  },

  // Update a video- really to delete one country rather than the other's URL
  update(id, data){
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Are we hitting this for the video update?");
      return res.json();
    });

  },

};

export const Belt = {
  // Fetch all belts from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belts`, {
      credentials: "include",
    }).then((res) => res.json());
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belts/${id}`, {
      credentials: "include",
    }).then((res) => {
      console.log("This is the belt response", res);
      return res.json();
    });
  },

  // // Fetch one belt from the server
  // one() {
  //   return fetch(`${REACT_APP_BASE_URL}/belts`, {
  //     credentials: "include"
  //   }).then(res => res.json());
  // },
};

export const TechniqueType = {
  // Fetch all technique types from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/technique_types`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/technique_types/${id}`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },
};

export const Technique = {
  // Fetch all techniques from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  find() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques_find`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  // Create a technique
  create(params) {
    console.log("############## test", params);
    // Params is an object that represents a technique
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },
  // Fetch a single technique
  one(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .catch(console.error);
  },

  // Update a technique

  // Try to debug this
  update(id, params) {
    console.log("this is from request js and the technique params", params);
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log("Are we hitting this?");
      return res.json();
    });
  },

  // Destroy a technique
  destroy(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());
  },

  // Get the details of a technique so that it may be updated
  details(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
  },
};

export const Session = {
  // Create a session
  create(params) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/session`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => res.json());
  },

  destroy() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/session`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());
  },
};

export const User = {
  // Fetch all users from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  // Current user
  current() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/current`, {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());
  },

  // Create a user
  create(params) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: params }),
    }).then((res) => res.json());
  },

  // Destroy a user
  destroy(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());
  },

  // Update a user
  update(id, params) {
    console.log("this is from request js and the user params", params);
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      // return res.json();
      return JSON.stringify(res);
    });
  },

};

export const InstructorQualification = {

  // Create an instructor qualification
  create(params) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/instructor_qualifications`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instructor_qualification: params }),
    }).then((res) => res.json());
  },

  // Fetch all instructor qualifications from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/instructor_qualifications`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/instructor_qualifications/${id}`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  // Update an instructor qualification
  update(id, params) {
    console.log("this is from request js and the instructor qualification params", params);
    return fetch(`${process.env.REACT_APP_BASE_URL}/instructor_qualifications/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  },
};

export const BeltGrade = {

  // Create a belt_grade
  create(params) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belt_grades`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ belt_grade: params }),
    }).then((res) => res.json());
  },

  // Fetch all belt_grades from the server
  getAll() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belt_grades`, {
      credentials: "include",
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belt_grades/${id}`, {
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  },

  // Update a belt grade
  update(id, params) {
    console.log("this is from request js and the belt_grade params", params);
    return fetch(`${process.env.REACT_APP_BASE_URL}/belt_grades/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  },
};

console.log("This is the session", process.env.REACT_APP_BASE_URL);