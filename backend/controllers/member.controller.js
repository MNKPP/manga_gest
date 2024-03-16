import memberService from "../services/member.service.js";
import {memberLoginSchema, memberRegisterSchema} from "../validators/member.validator.js";

const authController = {
    // TODO: Implement the controllers
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            await memberLoginSchema.validate({ username, password });
        } catch (error) {
            res.status(400).json({
                errorMessage: 'Invalid data'
            });
            return;
        }

        try {
            const member = await memberService.login({ username, password });
            res.status(200).json(member);
        } catch (error) {
            res.status(401).json({
                errorMessage: error.message
            });
        }
    },

    register: async (req, res) => {
        const data = req.body;

        let validationData;
        try {
            validationData = await memberRegisterSchema.validate(data)
        } catch (error) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data'
                })
            return;
        }

        const member = await memberService.register(validationData)

        if (!member) {
            res.status(500)
                .json({
                    errorMessage: 'Error on member register'
                });
        }

        res.status(201)
            .json(validationData);
    }
}

export default authController;