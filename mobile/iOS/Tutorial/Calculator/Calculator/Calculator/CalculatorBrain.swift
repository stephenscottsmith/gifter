//
//  CalculatorBrain.swift
//  Calculator
//
//  Created by Stephen Smith on 4/25/15.
//  Copyright (c) 2015 Stephen Smith. All rights reserved.
//

import Foundation

class CalculatorBrain {
    private enum Op {
        case Operand(Double)
        case UnaryOperation(String, Double -> Double)
        case BinaryOperation (String, (Double, Double) -> Double)
    }
    
    private var opStack = [Op]()
    
    private var knownOps = [String : Op]()
    
    init() {
        knownOps["⨉"] = Op.BinaryOperation("⨉", *)
        knownOps["÷"] = Op.BinaryOperation("÷", {$1 / $0})
        knownOps["+"] = Op.BinaryOperation("+", +)
        knownOps["−"] = Op.BinaryOperation("−", {$1 - $0})
        knownOps["√"] = Op.UnaryOperation("√", sqrt)
    }
    
    func evaluate(ops: [Op]) -> (result: Double?, remainingOps: [Op]) {
        if !ops.isEmpty {
            var remainingOps = ops
            let op = remainingOps.removeLast()
            switch op {
            case .Operand(let operand):
                return (operand, remainingOps)
            }
            case .UnaryOperation(_, Double -> Double):
                return (operation(operand), ...)
        }
        return (nil, ops)
    }
    
    func evaluate () -> Double? {
        
    }
    
    func pushOperand(operand: Double) {
        opStack.append(Op.Operand(operand))
    }
    
    func performOperation (symbol: String) {
        if let operation = knownOps[symbol] {
            opStack.append(operation)
        }
    }
}