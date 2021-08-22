const OrderSummary = require("./OrderSummary")
// @ponicode
describe("componentDidUpdate", () => {
    let inst

    beforeEach(() => {
        inst = new OrderSummary.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidUpdate("dummy_name", "Alabama", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.componentDidUpdate("dummyname", "Abruzzo", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.componentDidUpdate("dummy_name/", "Île-de-France", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.componentDidUpdate("$dummy_name", "Florida", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.componentDidUpdate("dummy_name/", "Abruzzo", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.componentDidUpdate(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
