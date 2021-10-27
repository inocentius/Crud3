const express = require("express");
const router = express.Router();

const { Employee } = require("../models/employee");

//get All Employees
router.get("/api/employee", (req, res) => {
  Employee.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(404).json({
        code : 404,
        message : "Error",
      })
    }
  });
});

//get single Employee
router.get("/api/employee/:id", (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.status(404).json({
        code : 404,
        message : "Error",
      });
    }
  });
});
//save Employee
router.post("/api/employee/add", (req, res) => {
  const emp = new Employee({
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary,
  });
  emp.save((err, data) => {
    if(!err) {
      res
      .status(200)
      .json({
        code: 200,
        message: "Employee Added Successfully",
        addEmployee: data,
      });
    } else {
      res.status(404).json({
        code : 404,
        message : "Error",
      })
    }
  });
});

//update Employee
router.put("/api/employee/edit/:id", (req, res) => {
  const emp = {
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary,
  };
  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, data) => {
      if (!err) {
        res
          .status(200)
          .json({
            code: 200,
            message: "Employee Updated Successfully",
            updateEmployee: data,
          });
      } else {
        res.status(404).json({
          code : 404,
          message : "Error",
        })
      }
    }
  );
});

//Delete Employee
router.delete("/api/employee/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res
        .status(200)
        .json({
          code: 200,
          message: "Employee Delete Successfully",
          deleteEmployee: data,
        });
    } else {
      res.status(404).json({
        code : 404,
        message : "Error",
      })
    }
  });
});

module.exports = router;
