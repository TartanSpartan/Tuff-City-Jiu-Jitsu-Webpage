//const REACT_APP_BASE_URL = `http://localhost:3000/api/v1`;

// Handling fetch requests for sessions, users etc

export const Syllabus = {

  // Fetch one syllabus from the server
  one(id) {
    return fetch(`${process.env.REACT_APP_REACT_APP_BASE_URL}/syllabi/${id}`, {
      credentials: "include"
    }).then(res => res.json());
  },
  
// Fetch all syllabi from the server
  all(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/syllabi/${id}/syllabi_full`, {
      credentials: "include"
    }).then(res => res.json());
  },
}


export const Video = {

  // Fetch all videos from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos`, {
      credentials: "include"
    }).then(res => res.json());
  },

  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}`, {
      credentials: "include"
    }).then(res=>{
      console.log("This is the video response", res);
      return(res.json())
      }
    );
  },

  
}

export const Belt = {

  // Fetch all belts from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/belts`, {
      credentials: "include"
    }).then(res => res.json());
  },

  // // Fetch one belt from the server
  // one() {
  //   return fetch(`${REACT_APP_BASE_URL}/belts`, {
  //     credentials: "include"
  //   }).then(res => res.json());
  // },
}

export const TechniqueType = {

  // Fetch all techniques from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/technique_types`, {
      credentials: "include"
    }).then(res=>{
      console.log(res);
      return(res.json())
      }
    );
  },


  find(id) {
    return fetch(`${process.env.REACT_APP_BASE_URL}/technique_types/${id}`, {
      credentials: "include"
    }).then(res=>{
      console.log(res);
      return(res.json())
      }
    );
  },
}


export const Technique = {

  // Fetch all techniques from the server
  all() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques`, {
      credentials: "include"
    }).then(res=>{
      console.log(res);
      return(res.json())
      }
    );
  },

  find() {
    return fetch(`${process.env.REACT_APP_BASE_URL}/techniques_find`, {
      credentials: "include"
    }).then(res=>{
      console.log(res);
      return(res.json())
      }
    );
  },

  // Create a technique
  create(params) {
        console.log("############## test", params)
            // Params is an object that represents a technique
        return fetch(`${process.env.REACT_APP_BASE_URL}/techniques`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)

        }).then(res=>res.json()

        );
  },
    // Fetch a single technique
    one(id) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
            credentials: "include"
        }).then(res => res.json())
        .catch(console.error);
    },

    // Update a technique
    update(id, params) {
      return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
          method: 'PATCH',
          credentials: "include",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
      }).then(res => res.json());
  },

    // Destroy a technique
    destroy(id) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
            method: 'DELETE',
            credentials: "include"
        }).then(res => res.json());
    },

    // Get the details of a technique so that it may be updated
    details(id) {
      return fetch(`${process.env.REACT_APP_BASE_URL}/techniques/${id}`, {
          method: 'GET',
          credentials: "include"
      }).then(res => res.json());
  },
  }

export const Session = {
    // Create a session
    create(params) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/session`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
          }).then(res => res.json());
    },
    destroy() {
        return fetch(`${process.env.REACT_APP_BASE_URL}/session`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.json());
    }
}

export const User = {
    // Create a user
    current() {
        return fetch(`${process.env.REACT_APP_BASE_URL}/users/current`, {
          method: "GET",
          credentials: "include"
        }).then(res => res.json());
      },
      create(params) {
        return fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: params })
        }).then(res => res.json());
      }
}

console.log("This is the session", process.env.REACT_APP_BASE_URL)