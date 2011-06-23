using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MorphDictionary
{
    public class MorpDictionary<TKey, TValue> : Dictionary<TKey, TValue>
    {
        public TValue this[int i]
        {
            get
            {
                int j = 0;
                foreach (KeyValuePair<TKey, TValue> kvp in this)
                {
                    if (j == i)
                    {
                        return kvp.Value;
                    }
                    j++;
                }
                throw new IndexOutOfRangeException();
            }

            set
            {
                int j = 0;
                foreach (KeyValuePair<TKey, TValue> kvp in this)
                {
                    if (j == i)
                    {
                        this[kvp.Key] = value;
                        return;
                    }
                }
                throw new IndexOutOfRangeException();
            }
        }
    }
}
