using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace Cosmo2EO_Value_Updater_2.Exceptions
{
    class NotUpToDateDataException: Exception, ISerializable
    {
        public NotUpToDateDataException()
            :base()
        { }

        public NotUpToDateDataException(string message)
            : base(message)
        { }

        public NotUpToDateDataException(string message, Exception inner)
            : base(message, inner)
        { }

        protected NotUpToDateDataException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        { }
    }
}