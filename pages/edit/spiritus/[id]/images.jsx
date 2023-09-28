import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Alert } from "@/components/Status";
import { DeleteSpiritusModal } from "@/components/forms/DeleteSpiritusModal";
import { EditImages } from "@/components/forms/EditImages";
import { EditorLayout } from "@/components/forms/Layout";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById } from "@/service/http/spiritus";

export default function EditSpiritusImages({ spiritus, coverImages }) {
  const { t } = useTranslation("common");
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onDelete() {
    openModal();
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
    setIsSuccess(false);
  };

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("edit_spiritus_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_spiritus_meta_desc")} />
      </Head>
      <DeleteSpiritusModal
        deleteId={spiritus.id}
        isOpen={isOpen}
        closeModal={closeModal}
      />

      <div className="relative mb-64 min-h-screen">
        {toastOpen && (
          <div className="sticky right-0 top-8 z-50 mb-5">
            <div className="flex justify-end">
              <Alert
                isSuccess={isSuccess}
                message={toastMessage}
                onClick={clearToast}
              />
            </div>
          </div>
        )}
        <EditorLayout
          menuId={1}
          spiritusSlug={spiritus.slug}
          name={spiritus.name}
          surname={spiritus.surname}
          birth={spiritus.birth}
          death={spiritus.death}
          spiritusId={spiritus.id}
          onDelete={onDelete}
        >
          <EditImages
            spiritus={spiritus}
            onError={onError}
            onSuccess={onSuccess}
          />
        </EditorLayout>
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const { data: spiritus } = await GetSpiritusById(id);

    if (!spiritus || !spiritus?.users) {
      throw "missing spiritus data";
    }

    for (const su of spiritus.users) {
      if (su.email === session.user.email && su.code === session.user.code) {
        return {
          props: {
            spiritus,
            ...(await serverSideTranslations(context.locale, [
              "common",
              "settings",
              "auth",
            ])),
          },
        };
      }
    }

    // user does not have access - redirect to previous page
    return {
      redirect: {
        destination: context.req.headers.referer || "/",
        permanent: false,
      },
    };
  } catch {
    // redirect to home in case of err
    // known errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
