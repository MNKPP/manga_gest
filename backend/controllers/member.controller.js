import memberService from "../services/member.service.js";
import animeListService from "../services/animeList.service.js";
import { memberLoginSchema, memberRegisterSchema } from "../validators/member.validator.js";
import { generateToken } from "../utils/jwt.utils.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";


const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            await memberLoginSchema.validate({ username, password });
        } catch (error) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data'
                });
            return;
        }

        const member = await memberService.login({ username, password });

        if (!member) {
            res.status(401)
                .json({
                    errorMessage: "Authentication failed"
                });
            return;
        }

        const token = await generateToken(member);

        res.status(200)
            .json({token: token});
    },

    register: async (req, res) => {
        const data = req.body;

        if (await memberService.checkEmail(data.email)) {
            res.status(400)
                .json({
                    errorMessage: 'Email already exist'
                })
            return;
        }

        let validationData;
        try {
            validationData = await memberRegisterSchema.validate(data)
        } catch (error) {
            res.status(400)
                .json({
                    errorMessage: 'Invalid data',
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

        await animeListService.addDefaultList(member.id);

        res.status(201)
            .json(validationData);
    },

    getById: async (req, res) => {
        const memberId = req.token.id;
        console.log(memberId)
        try {
            const member = await memberService.getById(memberId);
            res.status(200).json(member);
        } catch (error) {
            res.status(404).json({ errorMessage: 'Member not found' });
        }
    }
}

export default authController;