const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Plan = require('../models/plan');
const logRequest = require('../middleware/log');
const { fetchCompletePlan } = require('./helpers');

const router = new express.Router();

router.post('/api/plan/save', logRequest, async (req, res) => {

    try {
        const plan = await Plan.findOne({ userId: req.body.userId });
        if (plan) {
            // update existing plan
            plan.degreePlan = req.body.degreePlan;
            plan.customUnits = req.body.customUnits;
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

    const { userId } = req.query

    try {
        const plan = await Plan.findOne({ userId });
        if (!plan) {
            res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found lol' });
        }
        else {
            const result = await fetchCompletePlan(plan.degreePlan);
            res.status(StatusCodes.OK).send({
                degreePlan: result,
                customUnits: plan.customUnits,
            });
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.toString());
    }

})


module.exports = router;