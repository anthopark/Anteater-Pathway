const express = require('express');
const Plan = require('../models/plan');
const router = new express.Router();
const logRequest = require('../middleware/log');
const { default: userEvent } = require('@testing-library/user-event');

router.post('/api/plan/save', logRequest, async (req, res) => {

    try {
        const plan = await Plan.findOne({ userId: req.body.userId});
        if (plan) {
            // update existing plan
            plan.degreePlan = req.body.degreePlan;
            await plan.save(); 
            res.status(200).send(plan)
        } else {
            // create new plan
            const newPlan = new Plan(req.body);
            await newPlan.save();
            res.status(201).send(newPlan);
        }
    } catch (e) {
        res.status(400).send(e);
    }

})


router.get('/api/plan/load', logRequest, async (req, res) => {
    
    try {
        const plan = await Plan.findOne({ userId: req.body.userId });
        if (plan)
            res.status(200).send(plan.degreePlan);
        else
            res.status(404).send({ error: "Not found" });
    } catch (e) {
        res.status(400).send(e);
    }

})


module.exports = router;