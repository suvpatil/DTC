package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	//"time"
	"math/rand"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"strconv"
)

// Region Chaincode implementation
type DtcChaincode struct {
}

var WorldState = "DTC_DETAILS"

type contract struct{	
	TRADER_LOGIN_USERNAME           string   `json:"TRADER_LOGIN_USERNAME"`
	IS_BUYER                        string   `json:"IS_BUYER"`     
	IS_SELLER                       string `json:"IS_SELLER"`
	SELECTED_BUYER_NAME              string `json:"SELECTED_BUYER_NAME"`
	PURCHASE_ORDER                  string `json:"PURCHASE_ORDER"`
	TOTAL_PRICE                     string `json:"TOTAL_PRICE"`
	CURRENCY                      string `json:"CURRENCY"`
	DELIVERY_DATE                   string `json:"DELIVERY_DATE"`
	INCOTERM                      string `json:"INCOTERM"`
	PAYMENT_CONDITIONS              string `json:"PAYMENT_CONDITIONS"`
	ARTICLE_ID1                     string `json:"ARTICLE_ID1"`
	ARTICLE_DESC1                   string `json:"ARTICLE_DESC1"`
	ARTICLE_QUANTITY1               string `json:"ARTICLE_QUANTITY1"`
	ARTICLE_ID2                     string `json:"ARTICLE_ID2"`
	ARTICLE_DESC2                   string `json:"ARTICLE_DESC2"`
	ARTICLE_QUANTITY2               string `json:"ARTICLE_QUANTITY2"`
	BUYER_PAYMENT_CONFIRNMATION       string `json:"BUYER_PAYMENT_CONFIRNMATION"`
	SELLER_INFO_COUNTER_PARTY         string `json:"SELLER_INFO_COUNTER_PARTY"`
	BUYER_BANK_COMMITMENT            string `json:"BUYER_BANK_COMMITMENT"`
	SELLER_FOR_FAIT_INVOICE          string `json:"SELLER_FOR_FAIT_INVOICE"`
	INVOICE_STATUS                  string `json:"INVOICE_STATUS"`
	PAYMENT_STATUS                  string `json:"PAYMENT_STATUS"`
	CONTRACT_STATUS                 string `json:"CONTRACT_STATUS"`
	DELIVERY_STATUS                 string `json:"DELIVERY_STATUS"`
	IS_ORDER_CONFIRM               string `json:"IS_ORDER_CONFIRM"`
	DELIVERY_TRACKING_ID             string `json:"DELIVERY_TRACKING_ID"`
}

func (t *DtcChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	var err error
	// Initialize the chaincode

	var EmptyDTC []DtcChaincode
	jsonAsBytes, _ := json.Marshal(EmptyDTC)
	err = stub.PutState(WorldState, jsonAsBytes)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Deployment is completed\n")
	return nil, nil
}


// Add user data in Blockchain
func (t *DtcChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	// Handle different functions
	if function == "createContract" {
		// Insert User's data in blockchain
		return t.createContract(stub, args)	
	}else if function == "UpdateStatusDetails" {
		// Update User's data in blockchain
		return t.UpdateStatusDetails(stub, args)
	}

	return nil, errors.New("Received unknown function invocation")
}

func (t *DtcChaincode) UpdateStatusDetails(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var contractDetails []contract
    var contractObj contract	
	var UserId, purchaseOrder, status string

	UserId = args[0]
	purchaseOrder = args[1]
	status = args[2]

	jsonAsBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get consumer Transactions")
	}
	json.Unmarshal(jsonAsBytes, &contractDetails)

	i := 0
	l := len(contractDetails)
	for i < l {
		con := contractDetails[i]
		if con.TRADER_LOGIN_USERNAME == UserId && con.PURCHASE_ORDER == purchaseOrder{
			contractDetails = append(contractDetails[:i], contractDetails[i+1:]...)
			contractObj.TRADER_LOGIN_USERNAME = args[0]
			contractObj.PURCHASE_ORDER = args[1]
			if status == "IS_ORDER_CONFIRM"{
				contractObj.IS_ORDER_CONFIRM = "true"
				contractObj.CONTRACT_STATUS = "Ready for shipment"
				contractObj.DELIVERY_TRACKING_ID = con.DELIVERY_TRACKING_ID
				contractObj.DELIVERY_STATUS = con.DELIVERY_STATUS
				contractObj.PAYMENT_STATUS = con.PAYMENT_STATUS
			}
			
			if status == "CONTRACT_STATUS" && con.CONTRACT_STATUS == "Ready for shipment"{
				contractObj.IS_ORDER_CONFIRM = "true"
				contractObj.CONTRACT_STATUS = "Delivery ongoing"
				contractObj.DELIVERY_TRACKING_ID = strconv.Itoa(rand.Int())
				contractObj.DELIVERY_STATUS = con.DELIVERY_STATUS
				contractObj.PAYMENT_STATUS = con.PAYMENT_STATUS
			}

			if status == "CONTRACT_STATUS" && con.CONTRACT_STATUS == "Delivery ongoing"{
				contractObj.IS_ORDER_CONFIRM = "true"
				contractObj.DELIVERY_TRACKING_ID = con.DELIVERY_TRACKING_ID
				contractObj.CONTRACT_STATUS = "Deliver confirmed by buyer"
				contractObj.DELIVERY_STATUS = "Delivered"
				contractObj.PAYMENT_STATUS = con.PAYMENT_STATUS
			}

			if status == "PAYMENT_STATUS"{
				contractObj.IS_ORDER_CONFIRM = "true"
				contractObj.DELIVERY_TRACKING_ID = con.DELIVERY_TRACKING_ID
				contractObj.CONTRACT_STATUS = "Deliver confirmed by buyer"
				contractObj.DELIVERY_STATUS = "Delivered"
				contractObj.PAYMENT_STATUS = "Payment Initiated by Buyer"				
			}

			if status == "PAYMENT_STATUS" && con.PAYMENT_STATUS == "Payment Initiated by Buyer"{
				contractObj.IS_ORDER_CONFIRM = "true"
				contractObj.DELIVERY_TRACKING_ID = con.DELIVERY_TRACKING_ID				
				contractObj.DELIVERY_STATUS = "Delivered"
				contractObj.PAYMENT_STATUS = "Payment settled"
				contractObj.CONTRACT_STATUS = "Completed"			
			}


			contractObj.INVOICE_STATUS = con.INVOICE_STATUS
			//contractObj.PAYMENT_STATUS = args[3]
			//contractObj.CONTRACT_STATUS = args[4]
			//contractObj.DELIVERY_STATUS = args[5]
			//contractObj.IS_ORDER_CONFIRM = args[6]			
			contractObj.IS_BUYER = con.IS_BUYER
			contractObj.IS_SELLER = con.IS_SELLER
			contractObj.SELECTED_BUYER_NAME = con.SELECTED_BUYER_NAME			
			contractObj.TOTAL_PRICE = con.TOTAL_PRICE
			contractObj.CURRENCY = con.CURRENCY
			contractObj.DELIVERY_DATE = con.DELIVERY_DATE
			contractObj.INCOTERM = con.INCOTERM
			contractObj.PAYMENT_CONDITIONS = con.PAYMENT_CONDITIONS
			contractObj.ARTICLE_ID1 = con.ARTICLE_ID1
			contractObj.ARTICLE_DESC1 = con.ARTICLE_DESC1
			contractObj.ARTICLE_QUANTITY1 = con.ARTICLE_QUANTITY1
			contractObj.ARTICLE_ID2 = con.ARTICLE_ID2
			contractObj.ARTICLE_DESC2 = con.ARTICLE_DESC2
			contractObj.ARTICLE_QUANTITY2 = con.ARTICLE_QUANTITY2
			contractObj.BUYER_PAYMENT_CONFIRNMATION = con.BUYER_PAYMENT_CONFIRNMATION
			contractObj.SELLER_INFO_COUNTER_PARTY = con.SELLER_INFO_COUNTER_PARTY
			contractObj.BUYER_BANK_COMMITMENT = con.BUYER_BANK_COMMITMENT
			contractObj.SELLER_FOR_FAIT_INVOICE = con.SELLER_FOR_FAIT_INVOICE
			//contractObj.DELIVERY_TRACKING_ID = con.DELIVERY_TRACKING_ID
			contractDetails = append(contractDetails, contractObj)
			break
		} else {
			i++
		}
	}

	jsonAsBytes1, _ := json.Marshal(contractDetails)

	err = stub.PutState(WorldState, jsonAsBytes1)
	if err != nil {
		return nil, err
	}
	return nil, nil

}


func (t *DtcChaincode) createContract(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
    var contractDetails []contract
    var contractObj contract
	var contractSlice []string
	var valSplit []string
	var results []string
	var err error

	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Need 1 arguments")
	}

	contarctString := args[0]
	contractSlice = strings.Split(contarctString, ",")
	for i := range contractSlice{
		valSplit = strings.Split(contractSlice[i], ":")
		results = append(results, valSplit[1])
	}

	contractObj.TRADER_LOGIN_USERNAME = results[0]
	contractObj.IS_BUYER = results[1]
	contractObj.IS_SELLER = results[2]
	contractObj.SELECTED_BUYER_NAME = results[3]
	contractObj.PURCHASE_ORDER = results[4]
	contractObj.TOTAL_PRICE = results[5]
	contractObj.CURRENCY = results[6]
	contractObj.DELIVERY_DATE = results[7]
	contractObj.INCOTERM = results[8]
	contractObj.PAYMENT_CONDITIONS = results[9]
	contractObj.ARTICLE_ID1 = results[10]
	contractObj.ARTICLE_DESC1 = results[11]
	contractObj.ARTICLE_QUANTITY1 = results[12]
	contractObj.ARTICLE_ID2 = results[13]
	contractObj.ARTICLE_DESC2 = results[14]
	contractObj.ARTICLE_QUANTITY2 = results[15]
	contractObj.BUYER_PAYMENT_CONFIRNMATION = results[16]
	contractObj.SELLER_INFO_COUNTER_PARTY = results[17]
	contractObj.BUYER_BANK_COMMITMENT = results[18]
	contractObj.SELLER_FOR_FAIT_INVOICE = results[19]
	contractObj.INVOICE_STATUS = results[20]
	contractObj.PAYMENT_STATUS = results[21]
	contractObj.CONTRACT_STATUS = results[22]
	contractObj.DELIVERY_STATUS = results[23]
	contractObj.IS_ORDER_CONFIRM = results[24]
	contractObj.DELIVERY_TRACKING_ID = results[25]
		
	jsonAsBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get consumer Transactions")
	}
	json.Unmarshal(jsonAsBytes, &contractDetails)

	contractDetails = append(contractDetails, contractObj)
	jsonAsBytes1, _ := json.Marshal(contractDetails)

	err = stub.PutState(WorldState, jsonAsBytes1)
	if err != nil {
		return nil, err
	}
	return nil, nil
}


func (t *DtcChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {

	var Id string
	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting name of the person to query")
	}

	Id = args[0]
	//if function == "search" {
	if function == "getContractInstanceDetailsForTrader"{
        return t.getContractInstanceDetailsForTrader(stub, Id)    
	}
	
	return nil , errors.New("Received unknown function invocation")
}


func (t *DtcChaincode) getContractInstanceDetailsForTrader(stub shim.ChaincodeStubInterface, Id string) ([]byte, error) {
    var SearchContractDetails []contract
	var SearchContractDetailsNew []contract
	//var resultArray []string
	var Flag int

	banktxasBytes, err := stub.GetState(WorldState)
	if err != nil {
		return nil, errors.New("Failed to get Transactions")
	}

	json.Unmarshal(banktxasBytes, &SearchContractDetails)
	lengths := len(SearchContractDetails)

	if Id == "" {
		res, err := json.Marshal(SearchContractDetails)
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	}

	Flag = 0
	for i := 0; i < lengths; i++ {
		obj := SearchContractDetails[i]
		if Id == obj.PURCHASE_ORDER {
			SearchContractDetailsNew = append(SearchContractDetailsNew, obj)
			Flag = 1
		}else if Id == obj.TRADER_LOGIN_USERNAME {			
			SearchContractDetailsNew = append(SearchContractDetailsNew, obj)
			Flag = 1
		}
	}

	if Flag == 1 {
		res, err := json.Marshal(SearchContractDetailsNew)
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	}
	
	if Flag == 0 {
		res, err := json.Marshal("No Data found")
		if err != nil {
			return nil, errors.New("Failed to Marshal the required Obj")
		}
		return res, nil
	}
	return nil, errors.New("Failed to get the required Obj")
}

func doEvery(d time.Duration, f func(time.Time)) {
	for x := range time.Tick(d) {
		f(x)
	}
}

func helloworld(t time.Time) {	
	fmt.Printf("%v: Hello, World!\n", t)  //time compare	
}

func main() {
	doEvery(3*time.Second, helloworld)
	err := shim.Start(new(DtcChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
