using BlazorWeb.Helper;
using BlazorWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Drawing;
using System.Text;
namespace BlazorWeb.Controllers
{
    public class ContactsController : Controller
    {
        private readonly string _apiDomain;
        public ContactsController(IOptions<ApiDomain> apidomain)
        {
            _apiDomain = apidomain.Value.Domain;
        }
        public async Task<JsonResult> Get()
        {
            try
            {
                var apiService = new ApiService("");
                var jsonApiResponse = await apiService.GetApiResponseAsync(_apiDomain + "/api/Contact");
                var apiResponse = JsonConvert.DeserializeObject<ApiResponse<GetAllContactModel>>(jsonApiResponse);
                if (apiResponse != null && apiResponse.data.isValid)
                {
                    var List = apiResponse.data.value;
                    return Json(List);
                }
                else
                {
                    return Json(-1);
                }
            }
            catch (Exception ex)
            {
                return Json(-1);
            }
        }
        public async Task<IActionResult> Index()
        {
            try
            {
                var apiService = new ApiService("");
                var jsonApiResponse = await apiService.GetApiResponseAsync(_apiDomain + "/api/Contact");
                var apiResponse = JsonConvert.DeserializeObject<ApiResponse<GetAllContactModel>>(jsonApiResponse);
                if (apiResponse != null && apiResponse.data.isValid)
                {
                    var List = apiResponse.data.value;
                    return View(List);
                }
                else
                {
                    return View();
                }
            }
            catch (Exception ex)
            {
                return View();
            }
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ContactAddModel contactAddModel)
        {
            try
            {           
                var serializedObjectToCreate = JsonConvert.SerializeObject(contactAddModel, new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                });
                var content = new StringContent(serializedObjectToCreate, Encoding.UTF8, "application/json");
                var apiService = new ApiService("");
                var response = await apiService.PostApiResponseAsync(_apiDomain + "/api/Contact/save", content);
                var apiResponse = JsonConvert.DeserializeObject<ApiResponseOnther<ContactAddModel>>(response);
                if (apiResponse.isValid)
                {
                    return Json(new { erroR_CODE = "0", erroR_DESC = "Contact Created Successfully" });
                }
                else
                {
                    return Json(new { erroR_CODE = -1, Message = apiResponse.errors.FirstOrDefault() }) ;
                }
            }
            catch (Exception ex)
            {
                ApiResponseError errorResponse = null;
                errorResponse = JsonConvert.DeserializeObject<ApiResponseError>(ex.Message);
                var errorMessage = errorResponse?.Errors?.FirstOrDefault();
                return Json(new { erroR_CODE = -1, Message = errorMessage });
            }
        }

        public async Task<IActionResult> Edit(Guid id)
        {
            try
            {
                var apiService = new ApiService("");
                var response = await apiService.GetByIdAsync(_apiDomain + "/api/Contact/" + id);
                var apiResponse = JsonConvert.DeserializeObject<ApiResponseObject<GetAllContactModel>>(response);
                if (apiResponse != null)
                {
                    var GetByID = apiResponse.Value;       
                    return View(GetByID);
                }
                else
                {
                    return View();
                }
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ContactUpdateModal contactUpdateModal)
        {
            try
            {    
                var serializedObjectToCreate = JsonConvert.SerializeObject(contactUpdateModal, new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore
                });
                var content = new StringContent(serializedObjectToCreate, Encoding.UTF8, "application/json");
                var apiService = new ApiService("");
                var response = await apiService.PutApiResponseAsync(_apiDomain + "/api/Contact/update", content);
                var apiResponse = JsonConvert.DeserializeObject<ApiResponseOnther<ContactUpdateModal>>(response);
                if (response != null)
                {
                    return Json(new { erroR_CODE = "0", erroR_DESC = "Update Created Successfully" });
                }
                else
                {
                    return Json(new { erroR_CODE = -1, Message = apiResponse.errors.FirstOrDefault() });
                }
            }
            catch (Exception ex)
            {
                ApiResponseError errorResponse = null;
                errorResponse = JsonConvert.DeserializeObject<ApiResponseError>(ex.Message);
                var errorMessage = errorResponse?.Errors?.FirstOrDefault();
                return Json(new { erroR_CODE = -1, Message = errorMessage });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(Guid id)
        {
            var apiService = new ApiService("");
            try
            {
                var response = await apiService.DeleteApiResponseAsync(_apiDomain + "/api/Contact/delete/" + id);
                if (response != null)
                {
                    return Json(new { isValid = true, erroR_DESC = "نجاح" });
                }
                else
                {
                    return Json(new { isValid = false, erroR_DESC = "Error in request" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { isValid = false, erroR_DESC = ex.Message });
            }
        }
    }
}
