const express = require('express');
const Plan = require('../models/plan');
const router = new express.Router();
const logRequest = require('../middleware/log');
const { StatusCodes } = require('http-status-codes');

router.post('/api/plan/save', logRequest, async (req, res) => {

    try {
        const plan = await Plan.findOne({ userId: req.body.userId});
        if (plan) {
            // update existing plan
            plan.degreePlan = req.body.degreePlan;
            await plan.save();
            res.status(StatusCodes.OK).send(plan)
        } else {
            // create new plan
            const newPlan = new Plan(req.body);
            await newPlan.save();
            res.status(StatusCodes.CREATED).send(newPlan);
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.toString());
    }

})


router.get('/api/plan/load', logRequest, async (req, res) => {
    
    try {
        const plan = await Plan.findOne({ userId: req.body.userId });
        if (plan)
            res.status(StatusCodes.OK).send(plan.degreePlan);
        else
            res.status(StatusCodes.NOT_FOUND).send({ error: "Not found" });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.toString());
    }

})


module.exports = router;