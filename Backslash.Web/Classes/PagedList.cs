using System;
using System.Collections.Generic;

namespace Backslash.Web.Classes
{
    public class PagedList<T>
    {

        public int PageIndex { get; private set; }


        public int PageSize { get; private set; }


        public int TotalCount { get; private set; }


        public int TotalPages { get; private set; }


        public List<T> PagedItems { get; set; }

        private PagedList() { }

        public PagedList(List<T> data, int pageIndex, int pageSize, int totalCount)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;

            if (data != null)
            {
                this.PagedItems = data;
                TotalCount = totalCount;
                TotalPages = (int)Math.Ceiling(TotalCount / (double)PageSize);
            }

        }

        public bool HasPreviousPage
        {
            get { return (PageIndex > 0); }
        }


        public bool HasNextPage
        {
            get { return (PageIndex + 1 < TotalPages); }
        }


    }

}