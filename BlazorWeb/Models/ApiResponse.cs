namespace BlazorWeb.Models
{
    public class ApiDomain
    {
        public string Domain { get; set; }

    }
    public class ApiResponseError
    {
        public bool IsValid { get; set; }
        public List<string> Errors { get; set; }

        public ApiResponseError()
        {
            Errors = new List<string>();
        }
    }
    public class ApiResponseObject<T>
    {
        public bool IsValid { get; set; }
        public T Value { get; set; }
        public List<string> Errors { get; set; }
    }
    public class ApiResponseOnther<T>
    {
        public bool isValid { get; set; }
        public T value { get; set; }
        public List<string> errors { get; set; }
        public object Data { get; internal set; }
    }
   
    public class ApiResponse<T>
    {
        public Data<T> data { get; set; }
        public PagingParams pagingParams { get; set; }
    }
    public class Data<T>
    {
        public bool isValid { get; set; }
        public List<T> value { get; set; }
        public List<object> errors { get; set; }
    }
    public class PagingParams
    {
        public bool hasNextPage { get; set; }
        public bool hasPreviousPage { get; set; }
        public bool isFirstPage { get; set; }
        public bool isLastPage { get; set; }
        public int itemEnd { get; set; }
        public int itemStart { get; set; }
        public int pageCount { get; set; }
        public int pageIndex { get; set; }
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public int totalItemCount { get; set; }
    }
}
